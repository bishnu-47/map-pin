import mongoose from 'mongoose'

export default async function connectDb(){
    try {
    await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true})
    console.log("Connected to DB")
    } catch (error) {
        console.log("Connection to DB Failed", error.message)
    }
}