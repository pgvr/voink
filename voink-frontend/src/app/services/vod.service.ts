import { Injectable } from "@angular/core"
import * as streamsaver from "streamsaver"
streamsaver.mitm = "/mitm.html"
import { environment } from "../../environments/environment"

@Injectable({
    providedIn: "root",
})
export class VodService {
    writeStream: WritableStream
    writer: WritableStreamDefaultWriter
    vodObject: VodInfo
    qualities: Quality[]
    totalChunks: number = 1
    loadedChunks: number = 0
    abortController: AbortController
    constructor() {}

    async getVodFromId(id: string): Promise<void> {
        const response = await fetch(`${environment.apiUrl}/video?videoId=${id}`)
        const body = await response.json()
        this.vodObject = body.data[0]
    }

    async getQualitiesForVod(id: string): Promise<void> {
        const response = await fetch(`${environment.apiUrl}/video/qualities?videoId=${id}`)
        const body = await response.json()
        this.qualities = body
    }

    abortStream() {
        if (this.writer) {
            this.writer.abort()
            this.writer.releaseLock()
            this.abortController.abort()
            this.totalChunks = 1
            this.loadedChunks = 0
        }
    }

    async startDownload(selectedQuality: Quality, startChunk: number, endChunk: number) {
        this.abortController = new AbortController()
        // const { amountOfChunks } = await (
        //     await fetch(`${environment.apiUrl}/video/amountChunks?playlistUrl=${selectedQuality.url}`)
        // ).json()
        this.totalChunks = endChunk - startChunk
        this.loadedChunks = 0
        const downloadUrl = selectedQuality.url.split("index")[0].split("twitch.tv")[1]
        const start = new Date().getTime()
        this.writeStream = streamsaver.createWriteStream(
            `${this.vodObject.id}_${this.vodObject.user_name}_${
                selectedQuality.id === "chunked" ? selectedQuality.name : selectedQuality.id
            }.ts`,
        )
        this.writer = this.writeStream.getWriter()
        for (let i = startChunk; i <= endChunk; i = i + 10) {
            const requests = []
            // enough chunks left to make a batch request with 10?
            // chunks 0-9
            let enoughRemaining = endChunk - i > 9 ? 9 : endChunk - i
            for (let j = 0; j <= enoughRemaining; j++) {
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
                    this.loadedChunks++
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
    }

    private async getChunkSafe(url: string, i: number): Promise<ArrayBuffer> {
        return new Promise(async (upperResolve, reject) => {
            // const modulo = i % 200 < 1 ? 1 : i % 200
            // const urlIndex = modulo < 100 ? (modulo < 10 ? `00${modulo}` : `0${modulo}`) : `${modulo}`
            // vod-metro.twitch.tv
            // vod111-ttvnw.akamaized.net        vod${urlIndex}-ttvnw.akamaized.net
            // const baseUrl = environment.production ? "https://vod-metro.twitch.tv" : "/chunkProxy"
            let res = await fetch(`${environment.apiUrl}/proxy${url}${i}.ts`, {
                signal: this.abortController.signal,
            })
            if (res.status !== 200) {
                res = await fetch(`${environment.apiUrl}/proxy${url}${i}-muted.ts`, {
                    signal: this.abortController.signal,
                })
            }
            if (res.status !== 200) {
                reject(i)
            }
            let buffer = await res.arrayBuffer()
            upperResolve(buffer)
        })
    }
}

export interface Quality {
    id: string
    url: string
    name: string
}

export interface VodInfo {
    id: string
    user_id: string
    user_name: string
    title: string
    description: string
    created_at: Date
    published_at: Date
    url: string
    thumbnail_url: string
    viewable: string
    view_count: number
    language: string
    type: string
    duration: string
}
