import { Component, OnInit, Input } from "@angular/core"
import { VodService } from "src/app/services/vod.service"
import { NbStepperComponent } from "@nebular/theme"
import { UiService } from "src/app/services/ui.service"

@Component({
    selector: "app-fetch-vod",
    templateUrl: "./fetch-vod.component.html",
    styleUrls: ["./fetch-vod.component.scss"],
})
export class FetchVodComponent implements OnInit {
    @Input() stepper: NbStepperComponent
    vodIdInput = "557814568"
    constructor(public vodService: VodService, public ui: UiService) {}

    ngOnInit(): void {}

    async getVodInfo() {
        this.ui.isStepperLoading = true
        await Promise.all([
            this.vodService.getVodFromId(this.vodIdInput),
            this.vodService.getQualitiesForVod(this.vodIdInput),
        ])
        this.stepper.next()
        this.ui.isStepperLoading = false
    }
}
