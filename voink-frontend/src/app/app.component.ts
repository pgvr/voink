import { VodService } from "./services/vod.service"
import { HostListener, Component } from "@angular/core"
import { UiService } from "./services/ui.service"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    constructor(public vodService: VodService, public ui: UiService) {}

    @HostListener("window:unload", ["$event"])
    unloadHandler(event) {
        this.vodService.abortStream()
    }

    @HostListener("window:beforeunload", ["$event"])
    beforeUnloadHander(event) {
        if (this.vodService.writer && this.vodService.writeStream.locked) {
            event.preventDefault()
            event.returnValue = "If you leave the download will be canceled"
            return "If you leave the download will be canceled"
        }
    }
}
