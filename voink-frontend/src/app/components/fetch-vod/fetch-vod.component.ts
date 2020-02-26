import { Component, OnInit } from "@angular/core"
import { VodService } from "src/app/services/vod.service"

@Component({
    selector: "app-fetch-vod",
    templateUrl: "./fetch-vod.component.html",
    styleUrls: ["./fetch-vod.component.scss"],
})
export class FetchVodComponent implements OnInit {
    vodIdInput = "557707772"
    constructor(public vodService: VodService) {}

    ngOnInit(): void {}

    print(input) {
        // console.log(input.value)
    }

    async getVodInfo() {
        const vod = await this.vodService.getVodFromId(this.vodIdInput)
        console.log(vod)
        this.vodService.vodObject = vod
        this.vodService.setIsRevealed(true)
    }
}
