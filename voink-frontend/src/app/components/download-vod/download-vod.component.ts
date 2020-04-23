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
    chunkLength = 10
    endHours: number
    endMins: number
    endSeconds: number

    startHourInput = 0
    startMinInput = 0
    startSecondInput = 0
    endHourInput: number
    endMinInput: number
    endSecondInput: number

    selectedQuality
    showError = false
    constructor(public vodService: VodService) {}

    ngOnInit(): void {
        this.endHours = this.getHoursFromDuration(this.vodService.vodObject.duration)
        this.endHourInput = this.endHours
        this.endMins = this.getMinsFromDuration(this.vodService.vodObject.duration)
        this.endMinInput = this.endMins
        this.endSeconds = this.getSecondsFromDuration(this.vodService.vodObject.duration)
        this.endSecondInput = this.endSeconds
    }

    startDownload() {
        this.showError = false
        const valid = this.checkTimeSelection()
        // assume chunks to be 10 seconds for now
        const startChunk = this.getStartChunk()
        const endChunk = this.getEndChunk()

        if (valid) {
            this.vodService.startDownload(this.selectedQuality, startChunk, endChunk)
            this.stepper.next()
        } else {
            // show error
            this.showError = true
        }
    }

    getStartChunk() {
        const startSeconds = this.startHourInput * 60 * 60 + this.startMinInput * 60 + this.startSecondInput
        const startChunk = Math.floor(startSeconds / this.chunkLength)
        return startChunk
    }

    getEndChunk() {
        const endSeconds = this.endHourInput * 60 * 60 + this.endMinInput * 60 + this.endSecondInput
        const endChunk = Math.ceil(endSeconds / this.chunkLength) - 1
        return endChunk
    }

    checkTimeSelection() {
        const startSeconds = this.startHourInput * 60 * 60 + this.startMinInput * 60 + this.startSecondInput
        const endSeconds = this.endHourInput * 60 * 60 + this.endMinInput * 60 + this.endSecondInput
        if (endSeconds - startSeconds > 0) {
            return true
        } else {
            return false
        }
    }

    getHoursFromDuration(duration: string) {
        const array = duration.split("h")
        if (array.length > 1) {
            // contains hour at index 0
            const parsed = Number(array[0])
            return parsed
        } else {
            return 0
        }
    }

    getMinsFromDuration(duration: string) {
        const array = duration.split("m")
        if (array.length > 1) {
            // contains hour at index 0
            const hourMinSplit = array[0].split("h")
            if (hourMinSplit.length > 1) {
                const parsed = Number(hourMinSplit[1])
                return parsed
            } else {
                const parsed = Number(hourMinSplit[0])
                return parsed
            }
        } else {
            return 0
        }
    }

    getSecondsFromDuration(duration: string) {
        const array = duration.split("m")
        if (array.length > 1) {
            // contains hour at index 0
            const seconds = array[1].split("s")[0]
            return Number(seconds)
        } else {
            const seconds = array[0].split("s")[0]
            return Number(seconds)
        }
    }
}
