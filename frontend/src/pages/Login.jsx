import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSingin = async()=>{
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`,{
        email,
        password
      },{withCredentials:true})
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handelGoogleAuth = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  try {
    const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
      email:result.user.email,
    },{withCredentials:true})
    console.log(data)
  } catch (error) {
    console.log(error)
  } 
};

  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`}
          style={{ border: `1px solid ${borderColor}` }}
        >
          <h1
            className={`text-3xl font-bold mb-2`}
            style={{ color: primaryColor }}
          >
            Foodelix
          </h1>
          <p className="text-gray-600 mb-8">
            Login your account to get started with delicious food deliveries
          </p>

          {/* email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your Email"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className=" relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your Password"
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer absolute right-3 top-3 text-gray-500"
              >
                {!showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* forgot password */}
          <div className="text-right mb-4 text-[#ff4d2d] cursor-pointer" onClick={()=>navigate('/forgotPassword')}>Forgot Password</div>

          <button onClick={handelSingin}
            className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
          >
            Login
          </button>

          <button onClick={handelGoogleAuth} className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer border-gray-200 hover:bg-gray-200">
            <FcGoogle size={20} />
            <span>Sing in with Google</span>
          </button>
          <p className="text-center mt-6" onClick={() => navigate("/register")}>
            Want to create a new account ?{" "}
            <span className="text-[#ff4d2d] cursor-pointer">Register</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
