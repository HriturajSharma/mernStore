import express from "express";
// import login from '../controllers/login.js';
// import register from "../controllers/Register.js";
import { login, register } from "../controllers/Register.js";
let router = express.Router()


router.post("/register",register)
router.post("/login",login)


export default router