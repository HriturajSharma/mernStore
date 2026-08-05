import userModel from "../models/userModel.js"

const register = async (req, res) => {
  try {
    // console.log("check  == ?>  ",req)
    let { email, password } = req.body

    let existing = await userModel.findOne({email})
    console.log("check user exit or not ",existing)
    if(existing){
        return res.status(400).json({success:false,message:"user already exit"})
    }

    let user  = await userModel.create({
        email:email,
        password:password
    })

    return res.status(201).json({success:true,message:"User Created Successfully",user})

  } catch (error) {
    console.log('error ======>>  ', error)
    return res.status(500).json({success:false,message:error})
  }
}

export default register
