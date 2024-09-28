import { Client, ID, Databases, Storage, Query } from "appwrite";

const conf = {
    databaseId: "664cd502000af31ed320",
    collectionId: '664defea0037d1f685e7'
}


export class AllMusicPlaylist {
    clint = new Client()
    database;
    bucket;
    constructor() {
        this.clint
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('664cd46e0022294a4c81');

        this.database = new Databases(this.clint);
        this.bucket = new Storage(this.clint);
    }

    async getMusicPlayList()  {
        try {

            return await this.database.listDocuments<any>(
                conf.databaseId,
                conf.collectionId,
            )

        } catch (error: any) {
            console.log('getMusicPlayList error', error);
            throw error


        }
    }
}

const allMusicPlaylist = new AllMusicPlaylist();
export default allMusicPlaylist