import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true,
    },
    password:{
        type:String,
        required:true,
        minLength: [6, 'Password must be at least 6 characters long'],
        maxLength: [32, 'Password must be at most 32 characters long'],
        select: false,
    }
},{timestamps: true})

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({ email: this.email }, process.env.SECRET_KEY, { expiresIn: "1d" }) 
}

export  const User = mongoose.model("User", userSchema);