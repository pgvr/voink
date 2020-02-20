import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class VideoService {
    constructor(private http: HttpService) {}

    async getVideoInfo(videoId: string) {
        const response = await this.http.get(`https://api.twitch.tv/helix/videos?id=${videoId}`);
    }

    private getHeaders() {
        return {headers: {"Client-ID": process.env.TWITCH_CLIENT_ID || ""}};
    }
}
