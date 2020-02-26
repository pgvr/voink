import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root",
})
export class VodService {
    constructor() {}

    download() {
        console.log("download")
    }
}
