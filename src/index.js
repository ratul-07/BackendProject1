//require('dotenv').config({path: './env'})
// to use the import style for env add "-r dotenv/config --experimental-json-modules" after nodemon in the dev(scripts) part in package.json

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

// const app = express()

dotenv.config({
    path: './env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
    app.on("error", (error) => {
        console.log("error", error);
        throw error
    })
})
.catch((error) => {
    console.log("MongoDB connenction failed !!!", error);
})




/*

        This is the first approach to connect the DB from inside the index.js file but due to this it has polluted the index.js file. Therefore we will be using the second approach as it will distribute the files better and will help to write industry level and clean code.


import express from "express"

const app = express()


DB connection can be done normally but we should do the following two things

1) **DATABASE IS IN A DIFFERENT CONTITNENT** always remember this line as it takes time to connect a database.This is not always a instant process. Therefore ALWAYS USE ASYNC-AWAIT while connecting the DB

2) There might be some unkwown errors while connecting to a DB therefore USE A TRY-CATCH block

3) This might be a bonus , try to write the code to connect a DB in an IIFE.


;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("error: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR", error);
        throw err
    }
})() // the semicolon is just for cleaning purposes and used while writing iife

*/
