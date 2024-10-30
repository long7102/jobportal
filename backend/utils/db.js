import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Kết nối với mongodb thành công")
    } catch (error) {
        throw new Error(error)
    }
}

export default connectDB;