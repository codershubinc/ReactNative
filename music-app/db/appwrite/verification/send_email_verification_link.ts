import { Account, Avatars, Client, ID } from "appwrite";

export class SendEmailVerificationLink {

    clint = new Client();
    account
    avatar

    constructor() {
        this.clint
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('662ab42b7d237361fa26');
        this.account = new Account(this.clint);
        this.avatar = new Avatars(this.clint);
    }

    async sendEmailVerificationLink() {
        try {
            return await this.account.createVerification(
                'https://verify-user-email.vercel.app/from-android-app'
            )

        } catch (error) {
            throw error
        }
    }



}

const sendEmailVerificationLink = new SendEmailVerificationLink();
export default sendEmailVerificationLink