import React, { useState, useEffect } from 'react'

import axios from 'axios'

import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { api } from '../../API'
import { useStateContext } from '../../context/StateContext'

export function Profile() {
  const userId = localStorage.getItem('userId')
  const {name, setName} = useStateContext()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [Address, setAddress] = useState({
    street: '',
    pincode: '',
    city: '',
    state: '',
  })

  const [businessName, setBusinessName] = useState('')
  const [pincode, setPincode] = useState('')
  const [gst, setGst] = useState('')

  useEffect(() => {
    const getUserById = async () => {
      const response = await axios.get(`${api}user/${userId}`)
 
      setName(response.data.user.name)
      localStorage.setItem("name", response.data.user.name)
      setEmail(response.data.user.email)
      setPhone(response.data.user.phone)
      setBusinessName(response.data.user.businessName)
      setAddress(response.data.user.address)
      setGst(response.data.user.gst)
    }
    getUserById()
  }, [])

  const handleEditSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission
    const response = await axios.patch(`${api}user/edit/${userId}`, {
      name: name,
      email: email,
      address: Address,
      phone: phone,
      businessName: businessName,
      pincode: pincode,
      gst: gst,
    })

    console.log(response.data)
    toast.success('User Data Updated Successfully!')
  }

  return (
    <div>
      <Toaster />

      <div>
        <div className="max-w-7xl mx-auto mt-8 p-6 ">
          <div className="mb-6">
            <div className="flex gap-10 mb-8 items-start justify-start">
              <button
                className={
                  'border-[#4868B1] border-2 bg-white text-[#4868B1] py-2 px-4 rounded-3xl'
                }
              >
                Personal Details
              </button>
            </div>
            {/* Render form fields based on the active tab */}

            <div>
              <h1 className="text-3xl font-bold my-4">Edit Profile</h1>
              <form onSubmit={handleEditSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        default
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Mobile No
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <input
                        type="integer"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={Address.pincode}
                        onChange={(e) =>
                          setAddress({ ...Address, pincode: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4 mt-5">
                      <label className="block text-sm font-medium text-gray-700">
                        Business Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                    </div>

                    <div className="mb-4 mt-5">
                      <label className="block text-sm font-medium text-gray-700">
                        Street
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={Address.street}
                        onChange={(e) =>
                          setAddress({ ...Address, street: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4 mt-5">
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={Address.city}
                        onChange={(e) =>
                          setAddress({ ...Address, city: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-4 mt-5">
                      <label className="block text-sm font-medium text-gray-700">
                        Gst No (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 mt-8">
                  <Link to="/resetpassword">
                    <button
                      className="bg-[#4868B1] text-white  py-2 px-4 rounded"
                      type="button"
                    >
                      Reset Password
                    </button>
                  </Link>
                  <button
                    className="bg-[#4868B1] text-white  py-2 px-4 rounded"
                    type="submit"
                  >
                    Save Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
