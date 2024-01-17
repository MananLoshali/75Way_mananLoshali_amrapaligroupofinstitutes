import mongoose from "mongoose";


export const connectToDb = async (mongo_uri: string) => {
    try {
        await mongoose.connect(mongo_uri);
        console.log("DB connected successfully");

    } catch (error) {
        console.log("Error while connecting", error);

    }
}