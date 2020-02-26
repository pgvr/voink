import { Controller, Get, Query } from "@nestjs/common"
import { VideoService, VideoInfo } from "./video.service"

@Controller("video")
export class VideoController {
    constructor(private videoService: VideoService) {}

    @Get("")
    async getVideoInfo(@Query() query: { videoId: string }): Promise<VideoInfo | Error> {
        try {
            const videoInfo = await this.videoService.getVideoInfo(query.videoId)
            return videoInfo
        } catch (error) {
            return error
        }
    }

    @Get("qualities")
    async getVideoQualities(@Query() query: { videoId: string }) {
        try {
            const qualities = await this.videoService.getVideoQualities(query.videoId)
            return qualities
        } catch (error) {
            return error
        }
    }

    @Get("amountChunks")
    async getAmountChunks(@Query() query: { playlistUrl: string }) {
        try {
            const amountOfChunks = await this.videoService.getChunksForQuality(query.playlistUrl)
            return { amountOfChunks }
        } catch (error) {
            return error
        }
    }
}
