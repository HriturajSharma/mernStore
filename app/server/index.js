import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import dbconn from './utlis/db.js';
const app = express();


const dot = dotenv.config()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

console.log("check  == > dot",dot)

let port = process.env.PORT  ||  8001 
dbconn()

app.get('/',(req,res)=>{
    console.log("check  == >inside route " ) 
    res.send("check route  fine ✅")
})

app.listen(port,()=>{
    console.log("surver is running **")
})










