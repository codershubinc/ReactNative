import { Account, Client } from "appwrite";

export class SendUserVerificationLink {
    clint = new Client();
    account

    constructor() {
        this.clint
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('662ab42b7d237361fa26');
        this.account = new Account(this.clint);
    }
    async sendUserVerificationLink() {
        try {
            return await this.account.createVerification(
                'https://verify-user-email.vercel.app/from-android-app'
            )

        } catch (error: any) {
            throw error

        }
    }
}

const sendUserVerificationLink = new SendUserVerificationLink()

export default sendUserVerificationLink