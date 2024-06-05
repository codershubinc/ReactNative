import mongoose from "mongoose";
import { secret } from "@/secret.env";


export async function connectDB() {
    try {
        mongoose.connect(secret.MONGO_URI as string);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB successfully connected');
        })
        connection.on('error', (error) => {
            console.log('Something went wrong in connecting to MongoDB :', error);
            process.exit(1);
        })
    } catch (error) {
        console.log('Something went wrong in connecting to MongoDB', error);

    }
}





