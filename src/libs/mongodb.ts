import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";

let dbCache: mongoose.Connection | null = null;

export async function CreateConnection() {
    if (dbCache) return dbCache;
    try {
        config();
        const uri = process.env.MONGODB_URI as string;
        const options: ConnectOptions = {
            dbName: 'todo-app',
            serverApi: { version: '1', strict: true, deprecationErrors: true }
        };
        await mongoose.connect(uri, options);
        dbCache = mongoose.connection;
        console.log('Connected to MongoDB');
        return dbCache;
    }catch(err){
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}