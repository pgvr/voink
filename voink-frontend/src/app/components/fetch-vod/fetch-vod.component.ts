import { Component, Input } from "@angular/core"
import { NbStepperComponent } from "@nebular/theme"
import { UiService } from "src/app/services/ui.service"
import { VodService } from "src/app/services/vod.service"

@Component({
    selector: "app-fetch-vod",
    templateUrl: "./fetch-vod.component.html",
    styleUrls: ["./fetch-vod.component.scss"],
})
export class FetchVodComponent {
    @Input() stepper: NbStepperComponent
    vodIdInput = "557814568"
    constructor(public vodService: VodService, public ui: UiService) {}

    async getVodInfo(): Promise<void> {
        this.ui.isStepperLoading = true
        await Promise.all([
            this.vodService.getVodFromId(this.vodIdInput),
            this.vodService.getQualitiesForVod(this.vodIdInput),
        ])
        this.stepper.next()
        this.ui.isStepperLoading = false
    }
}
