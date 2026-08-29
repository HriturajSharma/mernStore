import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const userAuth = async (req, res, next) => {
  // console.log("______________req",req)
  try {
    let token = req.cookies.token
    console.log('token', token)
    if (!token) {
      return res.status(300).json({ success: false, message: 'invalid token' })
    }

    let decoded = jwt.verify(token, process.env.JwtToken)
    console.log('DECODED:', decoded)
    console.log('EXP:', new Date(decoded.exp * 1000))
    console.log('NOW:', new Date())

    req.user = decoded

    next()
  } catch (error) {
    return res.status(300).json({ success: false, message: 'Invalid user ' })
  }
}
