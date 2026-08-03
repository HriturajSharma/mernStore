import mongoose from 'mongoose'

let userSchema  = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "please enter your name"]
    },
    email:{
        type:String,
        require:[true,'please enter your email'],
        unique:true
    },
    password:{
        type:String,
        require:[true,"please enter your password"],
        minLength:[8,"password should have atlest 8 char"],
        select:false,
    },
    avatar:{
        url:{
            type:String
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


module.exports =mongoose.model("User",userSchema)