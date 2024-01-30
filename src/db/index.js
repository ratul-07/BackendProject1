import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

/*
    DB connection can be done normally but we should do the following two things

1) **DATABASE IS IN A DIFFERENT CONTITNENT** always remember this line as it takes time to connect a database.This is not always a instant process. Therefore ALWAYS USE ASYNC-AWAIT while connecting the DB

2) There might be some unkwown errors while connecting to a DB therefore USE A TRY-CATCH block

3) This might be a bonus , try to write the code to connect a DB in an IIFE.

*/

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`)
        console.log(`\n MongoDB connect !!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDB