import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

//cors(cross origin resource sharing) here is used when we pull data from external APIs
//.use is a middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

//to limit the amount of JSON data that can be recieved by the server so that it doesnt crashes
app.use(express.json({
    limit: "16kb",
}))

//url encoder to encode the URL so that express can understand url
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))
app.use(cookieParser())



export { app }