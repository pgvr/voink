import { Injectable, HttpService } from "@nestjs/common"
import { getAmountOfChunks, getQualities } from "../util/extm3u.parser"

@Injectable()
export class VideoService {
    constructor(private http: HttpService) {}

    async getVideoInfo(videoId: string): Promise<VideoInfo> {
        const config = this.getConfig()
        const url = `https://api.twitch.tv/helix/videos?id=${videoId}`
        const { data } = await this.http.get<VideoInfo>(url, config).toPromise()
        return data
    }

    private async getVodTokenAndSignature(videoId: string) {
        const webClientId = "kimne78kx3ncx6brgo4mv6wki5h1ko"
        const url = `https://api.twitch.tv/api/vods/${videoId}/access_token`
        const headers = { "Client-ID": webClientId }
        const { data } = await this.http.get(url, { headers }).toPromise()
        return data
    }

    async getVideoQualities(videoId: string) {
        const { token, sig } = await this.getVodTokenAndSignature(videoId)
        const url = `https://usher.ttvnw.net/vod/${videoId}.m3u8?token=${token}&sig=${sig}&allow_source=true`
        const { data } = await this.http.get(url).toPromise()
        const qualities = getQualities(data)
        return qualities
    }

    async getChunksForQuality(playlistUrl: string) {
        const playlistResponse = await this.http.get(playlistUrl).toPromise()
        const amountChunks = getAmountOfChunks(playlistResponse.data)
        return amountChunks
    }

    async getUserByName(streamerName: string): Promise<TwitchUser> {
        const url = `https://api.twitch.tv/helix/users?login=${streamerName}`
        const config = this.getConfig()
        const { data } = await this.http.get<{ data: TwitchUser[] }>(url, config).toPromise()
        return data.data[0]
    }

    async getLatestVideos(streamerName: string) {
        const user = await this.getUserByName(streamerName)
        const url = `https://api.twitch.tv/helix/videos?user_id=${user.id}`
        const config = this.getConfig()
        const { data } = await this.http.get<VideoInfo[]>(url, config).toPromise()
        return data
    }

    private getConfig() {
        return { headers: { "Client-ID": process.env.TWITCH_CLIENT_ID || "" } }
    }
}

export interface VideoInfo {
    id: string
    user_id: string
    user_name: string
    title: string
    description: string
    created_at: Date
    published_at: Date
    url: string
    thumbnail_url: string
    viewable: string
    view_count: number
    language: string
    type: string
    duration: string
}

export interface TwitchUser {
    id: string
    login: string
    display_name: string
    type: string
    broadcaster_type: string
    description: string
    profile_image_url: string
    offline_image_url: string
    view_count: number
}
