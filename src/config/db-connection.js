import { connect } from "mongoose";

export const initMongoDB = async () => {
    try {
        await connect(process.env.MONGO_URL)
    } catch (error) {
        throw new Error(error)
    }
}
