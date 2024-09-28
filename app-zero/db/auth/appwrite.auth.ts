import { Account, Avatars, Client, ID } from "appwrite";





export class AuthService {

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


    async createAccount({ email, password, name }: { email: string, password: string, name: string }) {
        try {
            return await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }: { email: string, password: string }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );

        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw false;
        }
    }

    async logout() {
        try {
            console.log("logging out");
            await this.account.deleteSession("current");
        } catch (error) {
            throw error;
        }
    }

    getUserInitials(name: string) {
        try {
            return this.avatar.getInitials(name);


        } catch (error) {
            throw error
        }


    }


}

const authService = new AuthService();

export default authService