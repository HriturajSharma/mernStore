import express from 'express'
import {
    forgetPassword,
    getAllUser,
    login,
    Logout,
    register,
    resetPassword
} from '../controllers/Register.js'
import { userAuth } from '../middleware/Auth.js'
import upload from '../middleware/upload.js'
let router = express.Router()

router.post('/register', upload.single('avatar'), register) //
router.post('/login', login)
router.post('/forget-password', forgetPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/logout', Logout)
router.get('/getAllUser', userAuth, getAllUser)

export default router
