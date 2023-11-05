import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { api } from "../../API";
import axios from "axios";
import loginmain from "../../assets/loginmain.jpeg"
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";
import { logo } from "../../assets";


export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${api}login`, {
        email,
        password,
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", // Set the appropriate content type
        },
      });

      const { data } = response; // Axios handles JSON parsing

      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user._id)
      localStorage.setItem("name", data.user.name);
      toast.success("Successfully Logged In!");
      setTimeout(() => {
        window.location.reload();
      },[1000])
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred while logging in";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <Toaster position="top-center" width="" reverseOrder={false} />
        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <Loading color="#0058AB" />
          </div>
        ) : (
          <div className="md:w-[80%] w-[100%] rounded-md grid md:grid-cols-2 grid-cols-1 my-10  bg-white  shadow-lg">
            <Toaster toastOptions={{ duration: 2000 }} />
            <div className="bg-[#A0BCE4]  rounded-md md:flex flex-col hidden">
              <div className="">
                {/* <h1 className="text-5xl text-white font-[600]">
                  Welcome to Dynamic Agencies
                </h1> */}
                {/* <img
                  src={drawline}
                  className="h-10 relative bottom-16 left-[90%]"
                  alt=""
                /> */}
              </div>
              <div className="flex items-start justify-center">
                <img src={loginmain} alt="" className="rounded-l-md" />
              </div>
            </div>
            <div className="flex md:p-10 p-6 justify-center flex-col w-full">
              <div className="flex items-center justify-center">
              <img src={logo} alt=""  className="h-20 w-32" />

              </div>
              <h2 className="text-4xl md:text-[#043133] text-[#3267FF] font-bold my-6 md:text-center text-left">
                Login
              </h2>
              <div>
                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block text-[#4D5959] mb-2 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="user@opdsure.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-6">
                  <label
                    htmlFor="password"
                    className="block text-[#4D5959] mb-2 font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='flex items-center justify-between'>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-password"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="show-password">Show Password</label>
                </div>
                {/* <Link to="/resetpassword">Reset Password</Link> */}
                </div>
                {/* <div className="flex items-center my-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  Remember me for 30 days
                </label>
              </div> */}
                {/* <div className="flex items-center my-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  checked={isCheckedTwo}
                  onChange={handleCheckboxTwoChange}
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  Login with OTP instead of password
                </label>
              </div> */}

                <button
                  type="submit"
                  className="w-full bg-[#4868B1] mt-4 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
                  onClick={handleSubmit}
                >
                  Login
                </button>
               
              </div>
      <CardFooter className="pt-0 mt-4">
          <Typography variant="large" className="text-center">
            Register an account?{' '}
            <Link to="/auth/sign-up" className="text-blue-500 font-semibold">
              Sign Up
            </Link>
          </Typography>
        </CardFooter>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignIn;
