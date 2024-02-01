import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // removes and leading/trailing whitespaces from the 'username'
            index: true, // indexing improves query performances (make it true for any field that you want to make easily searchable and is frequently searched upon)
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ], // array of objects (according to the model)
        password: {
            type: String,
            required: [true, "Password is required"], // for every true field we can give custom error message
        },
        refreshToken: {
            type: String,
        }
    }, 
{timestamps: true})


//the 'pre' hook is used so that whenever a user saves or modifies the password the password gets encrypted and get saved in the DB.
// the next() function is a way of middleware function to say, "Im done with my task lets move on to the next middleware or Route handler"

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
}) // here arrow function is not used in the callback as in arrow function there is no context of 'this' therefore this.password cannot be used 


// this function is used to compare the plain text password to the hashed password 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        _id = this.id,
        email = this.email,
        username = this.username,
        fullname = this.fullname,
    ),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:  process.env.ACCESS_TOKEN_EXPIRY,
    }
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        _id = this.id,
        email = this.email,
        username = this.username,
        fullname = this.fullname,
    ),
    process.env.ACCESS_REFRESH_SECRET,
    {
        expiresIn:  process.env.ACCESS_REFRESH_EXPIRY,
    }
}



export const User = mongoose.model("User", userSchema)