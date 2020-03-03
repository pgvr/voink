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
    NbSpinnerModule,
    NbSelectModule,
    NbProgressBarModule,
    NbBadgeModule,
    NbStepperModule,
} from "@nebular/theme"
import { NbEvaIconsModule } from "@nebular/eva-icons"
import { FetchVodComponent } from "./components/fetch-vod/fetch-vod.component"
import { DownloadVodComponent } from "./components/download-vod/download-vod.component"
import { ThumbnailDimensionsPipe } from "./pipes/thumbnail-dimensions.pipe"
import { DownloadProgressComponent } from "./components/download-progress/download-progress.component";
import { DoneComponent } from './components/done/done.component'

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
