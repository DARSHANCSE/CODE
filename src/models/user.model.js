import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
 
import { JsonWebTokenError } from "jsonwebtoken";

const userscchema=new Schema({
    username:{
        required:true,
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    username:{
        required:true,
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
fullname:{
        required:true,
        type:String,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverimage:String,
    watchhistory:{
        type:Schema.Types.ObjectId,
        ref:"video"
    },
    password:{
        type:String,
        required:[true,"pass is required"]
    },
    refreshtoken:{
        type:String
    }


    


},{timestamps:true})

export const user = mongoose.model("user",userscchema)