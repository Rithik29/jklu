import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { api } from '../../API'
import axios from 'axios'
import loginmain from "../../assets/loginmain1.jpeg";
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../../components/Loading'
import { logo } from '../../assets'

export function SignUp() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    businessName: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
    gst: '',
    password: '',
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type } = e.target

    if (type !== 'radio') {
      if (name.startsWith('address.')) {
        const addressField = name.split('.')[1]
        setUserData((prevUserData) => ({
          ...prevUserData,
          address: {
            ...prevUserData.address,
            [addressField]: value,
          },
        }))
      } else {
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value,
        }))
      }
    }
  }

  const checkPasswordsMatch = () => {
    if (password === confirmPassword) {
      setPasswordsMatch(true)
      setUserData({ ...userData, password: password })
    } else {
      setPasswordsMatch(false)
    }
  }

  useEffect(() => {
    checkPasswordsMatch()
  }, [password, confirmPassword])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${api}signup`, userData)
      console.log('User created:', response.data)
      toast.success(`Sign Up Successful`)
      setTimeout(() => (window.location.href = '/dashboard/home'), 1200)
      // You can show a success message here
    } catch (error) {
      toast.error("Couldn't Sign Up. Please Try Again Later.")
      // You can show an error message here
    }
  }

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
              <div className="flex items-start justify-center h-full">
                <img src={loginmain} alt="" className="rounded-l-md h-full" />
              </div>
            </div>
            <div className="flex md:p-10 p-6 justify-center flex-col w-full">
              <div className="flex items-center justify-center">
                <img src={logo} alt="" className="h-20 w-32" />
              </div>
              <h2 className="text-4xl md:text-[#043133] text-[#3267FF] font-bold my-6 md:text-center text-left">
                Register
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    size="lg"
                    required
                  />
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    size="lg"
                    required
                  />
                  <Input
                    type="tel"
                    label="Phone"
                    name="phone"
                    onChange={handleChange}
                    size="lg"
                    required
                  />

                  <Input
                    type="text"
                    label="Business Name"
                    name="businessName"
                    onChange={handleChange}
                    size="lg"
                    required
                  />
                  <Input
                    type="text"
                    label="Street Address"
                    name="address.street"
                    onChange={handleChange}
                    size="lg"
                    required
                  />
                  <Input
                    type="text"
                    label="City"
                    name="address.city"
                    onChange={handleChange}
                    size="lg"
                    required
                  />
                  <Input
                    type="text"
                    label="State"
                    name="address.state"
                    onChange={handleChange}
                    size="lg"
                    required
                  />
                  <Input
                    type="text"
                    label="Pincode"
                    name="address.pincode"
                    onChange={handleChange}
                    size="lg"
                    required
                  />

                  <div className="relative">
                    <Input
                      label="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      size="lg"
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      label=" Confirm password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      size="lg"
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {!passwordsMatch && (
                    <div className="text-red-500">Passwords do not match.</div>
                  )}
                </div>
                <div className="my-4">
                  <Input
                    type="text"
                    label="GST (Optional)"
                    name="gst"
                    onChange={handleChange}
                    size="lg"
                  />
                </div>
                <Button
                  variant="gradient"
                  type="submit"
                  fullWidth
                  className="mt-6"
                >
                  Sign Up
                </Button>
              </form>
              <CardFooter className="pt-0 mt-4">
                <Typography variant="small" className="text-center">
                  Already have an account?{' '}
                  <Link
                    to="/auth/sign-in"
                    className="text-blue-500 font-semibold"
                  >
                    Sign in
                  </Link>
                </Typography>
              </CardFooter>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SignUp
