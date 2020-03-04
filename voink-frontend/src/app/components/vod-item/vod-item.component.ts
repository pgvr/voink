import { Component, Input, Output } from "@angular/core"
import { VodInfo } from "src/app/services/vod.service"
import { EventEmitter } from "@angular/core"

@Component({
    selector: "app-vod-item",
    templateUrl: "./vod-item.component.html",
    styleUrls: ["./vod-item.component.scss"],
})
export class VodItemComponent {
    @Input() vod: VodInfo
    @Output() select: EventEmitter<VodInfo> = new EventEmitter()
}
