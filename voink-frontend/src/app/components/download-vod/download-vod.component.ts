import { Component, OnInit, Input } from "@angular/core"
import { VodService } from "src/app/services/vod.service"
import { NbStepperComponent } from "@nebular/theme"

@Component({
    selector: "app-download-vod",
    templateUrl: "./download-vod.component.html",
    styleUrls: ["./download-vod.component.scss"],
})
export class DownloadVodComponent implements OnInit {
    @Input() stepper: NbStepperComponent

    selectedQuality
    constructor(public vodService: VodService) {}

    ngOnInit(): void {}

    startDownload() {
        this.vodService.startDownload(this.selectedQuality)
        this.stepper.next()
    }
}
