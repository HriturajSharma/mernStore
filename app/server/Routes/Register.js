import express from "express";
import register from "../controllers/Register.js";
let router = express.Router()


router.post("/register",register)


export default router