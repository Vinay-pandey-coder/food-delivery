import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handelSingup = async()=>{
    
  }

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
            Create your account to get started with delicious food deliveries
          </p>

          {/* fullName */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your Full Name"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </div>

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

          {/* mobile */}
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-medium mb-1"
            >
              Mobile
            </label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your Mobile Number"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
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

          {/* role */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1"
            >
              Role
            </label>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((r) => (
                <button
                  className=" cursor-pointer flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors"
                  onClick={() => setRole(r)}
                  style={
                    role == r
                      ? { backgroundColor: primaryColor, color: "white" }
                      : {
                          border: `1px solid ${primaryColor}`,
                          color: primaryColor,
                        }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <button
            className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
          >
            Register
          </button>

          <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer border-gray-200 hover:bg-gray-200">
            <FcGoogle size={20} />
            <span>Sing up with Google</span>
          </button>
          <p className="text-center mt-6" onClick={() => navigate("/login")}>
            Already Have a account ?{" "}
            <span className="text-[#ff4d2d] cursor-pointer">Login</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
