import { Client, ID, Databases, Storage, Query } from "appwrite";

const conf = {
    databaseId: ".env",
    collectionId: '.env'
}


export class UserConfig {
    clint = new Client()
    database;
    bucket;
    constructor() {
        this.clint
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('.env');

        this.database = new Databases(this.clint);
        this.bucket = new Storage(this.clint);
    }

    async createUserConfig(
        {
            username,
            userId,
            userEmail,
            isUserVerified
        }: {
            username: string,
            userId: string,
            userEmail: string,
            isUserVerified: boolean
        }
    ) {
        try {
            return await this.database.createDocument(
                conf.databaseId,
                conf.collectionId,
                userId,
                {
                    username,
                    userId,
                    userEmail,
                    isUserVerified
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async getUserConfig(userId: string) {
        try {
            return await this.database.getDocument(
                conf.databaseId,
                conf.collectionId,
                userId
            );
        } catch (error) {
            throw error;
        }
    }

    async updateUserConfig(userId: string, prefs: any) {
        try {
            return await this.database.updateDocument(
                conf.databaseId,
                conf.collectionId,
                userId,
                {
                    ...prefs
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async getUserConfigByQuery(query: string) {
        try {
            return await this.database.listDocuments(
                conf.databaseId,
                conf.collectionId,
                [
                    Query.equal("userEmail", query)
                ]
            );
        } catch (error) {
            throw error;
        }
    }

}
const createUserConfig = new UserConfig();

export default createUserConfig
