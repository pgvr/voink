import { BrowserModule } from "@angular/platform-browser"
import { NgModule, APP_INITIALIZER } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from "./app-routing.module"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import {
    NbThemeModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
} from "@nebular/theme"
import { NbEvaIconsModule } from "@nebular/eva-icons"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: "default" }),
        NbLayoutModule,
        NbInputModule,
        NbButtonModule,
        NbCardModule,
        NbIconModule,
        NbEvaIconsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
