import express from "express";
// import login from '../controllers/login.js';
// import register from "../controllers/Register.js";
import { forgetpassword, login, register } from "../controllers/Register.js";
let router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.post("/forget-password",forgetpassword)


export default router