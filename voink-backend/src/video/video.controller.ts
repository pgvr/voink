import { Controller, Get } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
    constructor(private videoService: VideoService) {}

    @Get()
    getVideoInfo(videoId: string) {
        return process.env.TEST_TOKEN;
    }
}
