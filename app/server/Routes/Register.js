import express from "express";
// import login from '../controllers/login.js';
// import register from "../controllers/Register.js";
import { forgetPassword, getAllUser, login, register, resetPassword } from "../controllers/Register.js";
let router = express.Router()
import { userAuth } from "../middleware/Auth.js";


router.post("/register",register)
router.post("/login",login)
router.post("/forget-password",forgetPassword)
router.post("/reset-password/:token",resetPassword)
router.get("/getAllUser",userAuth,getAllUser)




export default router