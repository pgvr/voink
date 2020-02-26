import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: "root",
})
export class VodService {
    vodObject: VodInfo
    isRevealed = false
    isLoading = false
    constructor(private http: HttpClient) {}

    download() {
        console.log("download")
    }

    setIsRevealed(isRevealed: boolean): void {
        this.isRevealed = isRevealed
    }

    async getVodFromId(id: string): Promise<VodInfo> {
        this.isLoading = true
        const response = await fetch(`http://localhost:3000/video?videoId=${id}`)
        const body = await response.json()
        this.isLoading = false
        return body.data[0]
    }
}

export interface VodInfo {
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
