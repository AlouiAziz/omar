import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import CookieParser from 'cookie-parser';
import cors from "cors"
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import serverRoute from './routes/server.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("Connected To MongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disonnected")
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected")
})

app.use(cors())
app.use(CookieParser())
app.use(express.json())

app.use("/auth", authRoute)
app.use("/users", userRoute)
app.use("/servers", serverRoute)

app.listen(PORT, () => {
    connect()
    console.log("Server Running On Port ", PORT)
})