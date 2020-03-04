import { Component, Input } from "@angular/core"
import { NbStepperComponent } from "@nebular/theme"
import { UiService } from "src/app/services/ui.service"
import { VodService, VodInfo } from "src/app/services/vod.service"

@Component({
    selector: "app-fetch-vod",
    templateUrl: "./fetch-vod.component.html",
    styleUrls: ["./fetch-vod.component.scss"],
})
export class FetchVodComponent {
    @Input() stepper: NbStepperComponent
    vodIdInput = "557814568"
    latestVods: VodInfo[]
    constructor(public vodService: VodService, public ui: UiService) {}

    async getVodInfo(): Promise<void> {
        const inputType = this.determineInputType()
        if (inputType === InputType.ID) {
            this.getVodFromId(this.vodIdInput)
        } else if (inputType === InputType.NAME) {
            // get latest vods for name
        } else if (inputType === InputType.URL) {
            // extract id from url
            const parts = this.vodIdInput.split("/")
            const id = parts[parts.length - 1]
            this.getVodFromId(id)
        }
    }

    async getVodFromId(id: string): Promise<void> {
        this.ui.isStepperLoading = true
        await Promise.all([this.vodService.getVodFromId(id), this.vodService.getQualitiesForVod(id)])
        this.stepper.next()
        this.ui.isStepperLoading = false
    }

    async getLatestVodsForName(name: string): Promise<void> {
        this.ui.isStepperLoading = true
        this.latestVods = await this.vodService.getLatestVodsForName(name)
        this.ui.isStepperLoading = false
    }

    determineInputType(): InputType {
        const numberRegex = new RegExp(/^[0-9]+$/)
        const nameRegex = new RegExp(/^[0-9]+$/)
        const urlRegex = new RegExp(/^[0-9]+$/)
        if (numberRegex.test(this.vodIdInput)) {
            return InputType.ID
        } else if (nameRegex.test(this.vodIdInput)) {
            return InputType.NAME
        } else if (urlRegex.test(this.vodIdInput)) {
            return InputType.URL
        }
        return null
    }
}

enum InputType {
    ID,
    NAME,
    URL,
}
