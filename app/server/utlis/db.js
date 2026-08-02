import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()


let dbconn = async ()=>{
    try{
        let conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`check === >${conn.connection.host}`)

    }catch(error){
    console.log("error ",error )
    }
}

export default dbconn