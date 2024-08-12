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
    email:{
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
    coverimage :{type:String}
    ,

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
userscchema.pre("save",async function (next) {
    if (!this.ismodified("password")) return next()
    this.password=bcrypt.hash(this.password,10)
    next()
    
}
)
userscchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password )
} 
userscchema.methods.generateaccesstoken= function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})

}
userscchema.methods.generaterefreshtoken= function(){

    return jwt.sign({
        _id: this._id,
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})


}
export const user = mongoose.model("user",userscchema)