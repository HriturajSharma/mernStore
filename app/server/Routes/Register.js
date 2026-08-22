import express from "express";
// import login from '../controllers/login.js';
// import register from "../controllers/Register.js";
import { login, register, resetPassword } from "../controllers/Register.js";
let router = express.Router()


router.post("/register",register)
router.post("/login",login)
// router.post("/forget-password",forgetPassword)
router.post("/reset-password/:token",resetPassword)


export default router