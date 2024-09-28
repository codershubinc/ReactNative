import { Client, ID, Storage } from "appwrite";
import { LogBox } from "react-native";

const APPWRITE_SECRETES = {
    bucket_id: '66462360000d96376aa1'
}

export class UserAvatarConfig {

    clint = new Client();
    storage

    // TODO : this secrete keys should be in .env file


    constructor() {
        this.clint
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('662ab42b7d237361fa26');
        this.storage = new Storage(this.clint);
    }
    async updateUserAvatar(avatarImage: any) {
        try {
            return await this.storage.createFile(
                APPWRITE_SECRETES.bucket_id,
                ID.unique(),
                avatarImage
            )
        } catch (error: any) {
            console.log('avatar error', error.message);
            throw error
        }
    }


    getUserAvatar(avatarId: string) {

        try {
            return this.storage.getFilePreview(
                APPWRITE_SECRETES.bucket_id,
                avatarId,
                500,
                500
            )

        } catch (error: any) {

            console.log('avatar error', error);
            throw error


        }
    }


}
const userAvatarConfig = new UserAvatarConfig()
export default userAvatarConfig