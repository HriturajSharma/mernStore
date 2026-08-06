import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'

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

  res.status(200).json({ success: true, message: 'login successfully' })

  console.log('compare password check  == > ', validUser)
}
export { register, login }
