import { VodService } from "./services/vod.service"
import { HostListener, Component, isDevMode } from "@angular/core"
import { UiService } from "./services/ui.service"
import { Router, NavigationEnd } from "@angular/router"
import { filter } from "rxjs/operators"
declare let gtag

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    constructor(private router: Router, public vodService: VodService, public ui: UiService) {
        if (!isDevMode()) {
            const navEndEvent$ = router.events.pipe(filter(e => e instanceof NavigationEnd))
            navEndEvent$.subscribe((e: NavigationEnd) => {
                // eslint-disable-next-line @typescript-eslint/camelcase
                gtag("config", "UA-100079341-7", { page_path: e.urlAfterRedirects, anonymize_ip: true })
            })
        }
    }

    @HostListener("window:unload", ["$event"])
    unloadHandler(): void {
        this.vodService.abortStream()
    }

    @HostListener("window:beforeunload", ["$event"])
    beforeUnloadHander(event): string {
        if (this.vodService.writer && this.vodService.writeStream.locked) {
            event.preventDefault()
            event.returnValue = "If you leave the download will be canceled"
            return "If you leave the download will be canceled"
        }
    }
}
