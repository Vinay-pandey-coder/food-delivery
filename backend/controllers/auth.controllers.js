import User from "../models/User.model.js"
import bcrypt from "bcrypt"
import genToken from "../utils/token.js"

export const register = async(req,res)=>{
    try {
        const {fullName,email,password,mobile,role} = req.body

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message:"User already exists"})
        }

        if (password.length<6) {
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        if (!mobile.length<10) {
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
        if (user) {
            return res.status(400).json({message:"User Not Found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const token = genToken(newUser._id)
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