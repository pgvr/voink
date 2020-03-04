import { HttpModule, Module } from "@nestjs/common"
import { config } from "dotenv"
import { resolve } from "path"
import { VideoController } from "./video/video.controller"
import { VideoService } from "./video/video.service"

config({ path: resolve(__dirname, "../.env") })

@Module({
    imports: [HttpModule],
    controllers: [VideoController],
    providers: [VideoService],
})
export class AppModule {}
