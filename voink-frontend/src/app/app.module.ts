import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NbEvaIconsModule } from "@nebular/eva-icons"
import {
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbProgressBarModule,
    NbSelectModule,
    NbSpinnerModule,
    NbStepperModule,
    NbThemeModule,
} from "@nebular/theme"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { DoneComponent } from "./components/done/done.component"
import { DownloadProgressComponent } from "./components/download-progress/download-progress.component"
import { DownloadVodComponent } from "./components/download-vod/download-vod.component"
import { FetchVodComponent } from "./components/fetch-vod/fetch-vod.component"
import { ThumbnailDimensionsPipe } from "./pipes/thumbnail-dimensions.pipe"

@NgModule({
    declarations: [
        AppComponent,
        FetchVodComponent,
        DownloadVodComponent,
        ThumbnailDimensionsPipe,
        DownloadProgressComponent,
        DoneComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: "cosmic" }),
        NbLayoutModule,
        NbInputModule,
        NbButtonModule,
        NbBadgeModule,
        NbStepperModule,
        NbProgressBarModule,
        NbSelectModule,
        NbCardModule,
        NbIconModule,
        NbSpinnerModule,
        NbEvaIconsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
