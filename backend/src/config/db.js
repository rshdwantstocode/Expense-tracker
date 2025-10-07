import mongoose from "mongoose"

export default async function connectDB() {
    try {
        // console.log("MONGO_URL:", process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL)

        console.log("MongoDB connected succesfully!!");

    } catch (error) {
        console.log(error);
        // process.exit(1) //exit with failure
    }
}