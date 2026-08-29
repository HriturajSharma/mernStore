import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import jsonWebToken from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import mailFire from '../utlis/mailFilre.js'

dotenv.config()

const register = async (req, res) => {
  try {
    let { name, email, password } = req.body

    let existing = await userModel.findOne({ email })
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: 'user already exit' })
    }
    let protectedPass = await bcrypt.hash(password, 10)

    let user = await userModel.create({
      name: name,
      email: email,
      password: protectedPass
    })

    return res
      .status(201)
      .json({ success: true, message: 'User Created Successfully', user })
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}

const login = async (req, res) => {
  let { email, password } = req.body

  try {
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

    let token = jsonWebToken.sign({ email: user.email }, process.env.JwtToken, {
      expiresIn: '2min'
    })

    let setCookies = res?.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NodeEnv == 'prod',
      sameSite: 'lax',
      maxAge: 2 * 60 * 1000
    })

    if (!setCookies) {
      return res.status(300).json({ success: false, message: 'please login' })
    }

    return res.status(200).json({
      success: true,
      message: 'login successfully',
      messageData: `welcome ${user.email}`
    })
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'invalid token or Expire' })
  }
}

const forgetPassword = async (req, res) => {
  try {
    let { email } = req.body
    let isUserExit = await userModel.findOne({ email })

    if (!isUserExit) {
      return res
        .status(301)
        .json({ success: false, message: 'Invalid user please register first' })
    }

    let resetToken = crypto.randomBytes(32).toString('hex')

    let HashToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    isUserExit.resetPasswordToken = HashToken
    isUserExit.resetPasswordExpire = Date.now() + 5 * 60 * 1000

    await isUserExit.save()
    let resetLink = `http://localhost:${process.env.PORT}/api/reset-password/${resetToken}`

    await mailFire(
      email,
      'Reset password',
      `click here to reset password : ${resetLink}`
    )

    return res.status(200).json({
      success: true,
      message: `mail sanded successfully 📧 to ${email} `
    })
  } catch (error) {
    return res.status(501).json({ success: false, message: error })
  }
}

const resetPassword = async (req, res) => {
  let { password } = req.body
  let { token } = req?.params

  console.log('🔥 RESET ROUTE HIT')
  console.log('TOKEN:', req.params.token)
  console.log('token === ? ', token)

  try {
    // let isUserExit = userModel.findOne({email})
    let hashesToken = crypto.createHash('sha256').update(token).digest('hex')

    let user = await userModel.findOne({
      resetPasswordToken: hashesToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    console.log('check  == > user ', user)

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'invalid or expired token !' })
    }

    let HashPassword = await bcrypt.hash(password, 10)
    console.log('check password HashPassword', HashPassword)
    user.password = HashPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    res
      .status(201)
      .json({ success: true, message: 'password updated successfully' })
  } catch (error) {
    return res.status(501).json({ success: true, message: error })
  }
}

const getAllUser = async (req, res) => {
  try {
    let user = await userModel
      .find()
      .select('-__v -resetPasswordToken -resetPasswordExpire')

    return res.status(200).json({
      success: true,
      message: 'fetched successfully',
      response: { data: user, length: user?.length }
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

export { forgetPassword, getAllUser, login, register, resetPassword }
