import mongoose from 'mongoose'

let userModal = new mongoose.Schema({
  name: {
    type: String,
    required: [false, 'please enter your name']
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
    minLength: [8, 'password should have AtLest 8 char']
  },
  avatar: {
    url: {
      type: String
    }
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

export default mongoose.model('User', userModal)
