import { Component } from "@angular/core"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "voink-frontend"

    testFunc() {
        const test = 0
        console.log("Hi")
    }
}
