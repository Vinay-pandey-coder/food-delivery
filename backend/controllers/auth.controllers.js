import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
import { sendOtpMail } from "../utils/email.js"

export const register = async(req,res)=>{
    try {
        const {fullName,email,password,mobile,role} = req.body

        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message:"User already exists"})
        }

        if (password.length<6) {
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        if (mobile.length < 10) {
            return res.status(400).json({message:"mobile number must be at least 10 digits"})   
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
            mobile,
            role
        })

        const token = genToken(newUser._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        }) 

        await newUser.save()
        res.status(201).json({message:"User created successfully"})

    } catch (error) {
        console.log(error)
    }
}


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message:"User Not Found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const token = genToken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        }) 
        res.status(201).json({message:"Login successfully"})

    } catch (error) {
        console.log(error)
    }
}

export const logout = async(req,res)=>{
    try {

        res.clearCookie("token")
        return res.status(200).json({message:"Logout successfully"})

    } catch (error) {
        console.log(error)
    }
}


export const sendOtp = async(req,res)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message:"User does not exist"})
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires= Date.now()+5*60*1000
        user.isOtpVerified=false
        await user.save()
        await sendOtpMail(email,otp)
        res.status(200).json({message:"OTP sent successfully"})
    } catch (error) {
        console.log(error)
    }
}


export const verifyOtp = async(req,res)=>{
    try {
        const {email,otp} = req.body
        const user = await User.findOne({email})

        if (!user || user.resetOtp!=otp || user.otpExpires<Date.now()) {
            return res.status(400).json({message:"Invalid OTP"})
        }
        user.resetOtp=undefined
        user.otpExpires=undefined
        user.isOtpVerified=true
        await user.save()
        res.status(200).json({message:"OTP verified successfully"})

    } catch (error) {
        console.log(error)
    }
}


export const resetPassword = async(req,res)=>{
    try {
        const {email,newPassword} = req.body
        const user = await User.findOne({email})

        if (!user || !user.isOtpVerified) {
            return res.status(400).json({message:"otp verfication required"})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.password=hashedPassword
        await user.save()
        user.isOtpVerified=false
        await user.save()
        res.status(200).json({message:"Password reset successfully"})

    } catch (error) {
        console.log(error)
    }
}

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role} = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
      });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json(user);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};