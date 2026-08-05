import mongoose from 'mongoose'

let userModal  = new mongoose.Schema({
    name:{
        type:String,
        required:[false, "please enter your name"]
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
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

// userSchema.pre("save",async (next)=>{

//   if(!this.isModified("password")){
//      next()
//   }
//   this.password = await bcrypt.hash(this.password,10)
//   console.log("check password  ",this.password)

// })


// module.exports =mongoose.model("User",userModal)
export default  mongoose.model("User",userModal)