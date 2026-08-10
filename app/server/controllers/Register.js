import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jsonWebToken from 'jsonwebtoken'
import userModel from '../models/userModel.js'

dotenv.config()

const register = async (req, res) => {
  try {
    // console.log("check  == ?>  ",req)
    let { name, email, password } = req.body

    let existing = await userModel.findOne({ email })
    console.log('check user exit or not ', existing)
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: 'user already exit' })
    }
    let protectedPass = await bcrypt.hash(password, 10)
    console.log('check  == protected password', protectedPass)

    let user = await userModel.create({
      name: name,
      email: email,
      password: protectedPass
    })

    return res
      .status(201)
      .json({ success: true, message: 'User Created Successfully', user })
  } catch (error) {
    console.log('error ======>>  ', error)
    return res.status(500).json({ success: false, message: error })
  }
}

const login = async (req, res) => {
  let { email, password } = req.body

  let user = await userModel.findOne({ email })

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: 'please Login first' })
  }

  let validUser = await bcrypt.compare(password, user.password)
  if (!validUser) {
    res.status(401).json({ success: false, message: 'Invalid password' })
  }

  console.log('check  === >> ** ', req.body)

  let token = jsonWebToken.sign({ email: user.email }, process.env.JwtToken, {
    expiresIn: '5min'
  })

  let setCookies = res?.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NodeEnv == 'prod',
    sameSite: 'lax'
  })

  if (!setCookies) {
    return res.status(300).json({ success: false, message: 'please login' })
  }

  return res
    .status(200)
    .json({
      success: true,
      message: 'login successfully',
      messageData: `welcome ${user.email}`
    })
}
export { register, login }
