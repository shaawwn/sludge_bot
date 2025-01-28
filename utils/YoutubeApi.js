import "dotenv/config"
import {google} from 'googleapis'



export default class YoutubeApi {
    constructor() {
        this.yt = google.youtube({
            version: "v3",
            auth: process.env.YOUTUBE_PUBLIC_API
        })
    }
    
    async search(query) {
        const response = await this.yt.search.list({
            part: 'snippet',
            q: query,
            maxResults: 5
        })

        console.log("Search results: ", response.data.items)
    }
}