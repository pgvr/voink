import { Component, OnDestroy, HostListener } from "@angular/core"
import * as streamsaver from "streamsaver"
streamsaver.mitm = "/mitm.html"
import { Quality } from "../../../voink-backend/src/video/video.types"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    loading = false
    writeStream: WritableStream
    writer: WritableStreamDefaultWriter
    videoIdInput
    isCardRevealed = false
    constructor() {}

    @HostListener("window:unload", ["$event"])
    unloadHandler(event) {
        this.abortStream()
    }

    @HostListener("window:beforeunload", ["$event"])
    beforeUnloadHander(event) {
        if (this.writer && this.writeStream.locked) {
            event.preventDefault()
            event.returnValue = "If you leave the download will be canceled"
            return "If you leave the download will be canceled"
        }
    }

    abortStream() {
        if (this.writer) {
            this.writer.abort()
        }
    }

    toggleCard() {
        this.isCardRevealed = !this.isCardRevealed
    }

    async downloadAllInOne() {
        if (!this.videoIdInput) {
            console.log("no video id")
            return
        }
        const qualities: Quality[] = await (
            await fetch(`http://localhost:3000/video/qualities?videoId=${this.videoIdInput}`)
        ).json()
        console.log(qualities)
        const { amountOfChunks } = await (
            await fetch(`http://localhost:3000/video/amountChunks?playlistUrl=${qualities[4].url}`)
        ).json()
        console.log(amountOfChunks)
        const downloadUrl = qualities[4].url.split("index-muted")[0].split("twitch.tv")[1]
        console.log(downloadUrl)
        const start = new Date().getTime()

        this.loading = true
        this.writeStream = streamsaver.createWriteStream(`${this.videoIdInput}.ts`)
        this.writer = this.writeStream.getWriter()
        for (let i = 0; i < amountOfChunks; i = i + 20) {
            const requests = []
            const enoughRemaining = amountOfChunks - i >= 20 ? 20 : amountOfChunks - i
            for (let j = 0; j < enoughRemaining; j++) {
                requests.push(this.getChunkSafe(downloadUrl, i + j))
            }
            const buffers = (await Promise.all(requests).catch(err => {
                console.log("error " + err)
            })) as ArrayBuffer[]
            await new Promise(async resolve => {
                for (let j = 0; j < buffers.length; j++) {
                    // Got Chunk, write it
                    await this.writer.ready
                    const byteArray = new Uint8Array(buffers[j])
                    console.log(`writing ${i + j}`)
                    this.writer.write(byteArray)
                }
                resolve()
            })
        }
        await this.writer.ready
        this.writer.close()
        console.log("closing writer")
        const end = new Date().getTime()
        const duration = (end - start) / 1000
        console.log(`this took ${duration} seconds`)
        this.loading = false
    }

    async getChunkSafe(url: string, i: number): Promise<ArrayBuffer> {
        return new Promise(async (upperResolve, reject) => {
            const modulo = i % 200 < 1 ? 1 : i % 200
            const urlIndex = modulo < 100 ? (modulo < 10 ? `00${modulo}` : `0${modulo}`) : `${modulo}`
            // vod-metro.twitch.tv
            // vod111-ttvnw.akamaized.net        vod${urlIndex}-ttvnw.akamaized.net
            let res = await fetch(`/chunkProxy${url}${i}.ts`)
            if (res.status !== 200) {
                res = await fetch(`/chunkProxy${url}${i}-muted.ts`)
            }
            if (res.status !== 200) {
                reject(i)
            }
            let buffer = await res.arrayBuffer()
            upperResolve(buffer)
        })
    }
}
