import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { api } from './../../API'
import Loading from '../../components/Loading'
import { FaDeleteLeft, FaPencil, FaSearchengin, FaTrash } from 'react-icons/fa6'

const UserList = () => {
  const [data, setData] = useState([])
  const [showNotification, setShowNotification] = useState('')
  const [UserId, setUserId] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filteredClients, setFilteredClients] = useState([])

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    businessName: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
    gst: '',
  })

  const [EditUserData, setEditUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    businessName: '',
    address: {
      street: '',
      city: '',
      state: '',
    },
    pincode: '',
    gst: '',
  })

  const [editFormVisible, setEditFormVisible] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    // If the input field is part of the address object, update it accordingly
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
  console.log(userData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${api}admin/signup`, userData)
      console.log('User created:', response.data)
      setUserData({
        name: '',
        email: '',
        phone: '',
        role: 'customer',
        businessName: '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: '',
        },
        gst: '',
      })
      if (response.status === 201) {
        toast.success(`New ${response.data.user.name} has been added`)
        setTimeout(() => window.location.reload(), 1200)
      } else {
        // Handle unexpected response status codes
        console.error('Unexpected response status:', response.status)
        toast.error('An error occurred while creating the user.')
      }
    } catch (error) {
      console.error('Error creating user:', error)

      if (error.response) {
        // Server responded with an error status code (4xx or 5xx)
        toast.error(`Server error: ${error.response.status}`)
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response received from the server.')
      } else {
        // Something else happened while setting up the request
        toast.error('An error occurred while making the request.')
      }
    }
  }

  // Display all Products Details
  useEffect(() => {
    setLoading(true)
    async function fetchProducts() {
      try {
        const response = await axios.get(`${api}users`)
        setData(response.data)
        setFilteredClients(response.data)
        setLoading(false)
      } catch (error) {
        toast.error(error.message)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // delete Product by Id
  const handleDeleteUser = async (UserId) => {
    try {
      await axios.delete(`${api}user/delete/${UserId}`)
      setData((prevUsers) => prevUsers.filter((user) => user._id !== UserId))
      toast.success(`${UserId} has been deleted`)
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) {
      console.error('Error deleting User:', error.message)
    }
  }

  const hideEditForm = () => {
    setEditFormVisible(false)
  }

  const handleEditSubmit = async(id) => {
    setEditFormVisible(true)
    setUserId(id)
    const response = await axios.get(`${api}user/${id}`);
    console.log(response.data.user);
    setUserData(response.data.user);
  }

  const handleEditUser = async (e) => {
    e.preventDefault()

    try {
      const apiUrl = `${api}user/edit/${UserId}`
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()
      console.log(data)
      toast.success('User data updated successfully!')
      // setProductData((prevData) => ({
      //   ...prevData,
      //   [UserId]: { ...prevData[UserId], ...EditProductData },
      // }));
      hideEditForm()
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) {
      console.error('Error:', error)
      toast.error(`An unexpected error occurred: ${error.message}`)
    }
  }

  const handleConfirm = () => {
    // Logic for handling confirm action
    handleDeleteUser(UserId)
    setShowNotification(false)
  }

  const handleCancel = () => {
    // Logic for handling cancel action
    setShowNotification(false)
  }

  const handleProductCancel = () => {
    setShowNotification(true)
  }

  const RoleOptions = ['customer', 'admin']

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()

    setSearchQuery(query)

    const filteredClients = data.filter((client) => {
      const clientEmail = client.email ? client.email.toLowerCase() : ''
      const clientName = client.name ? client.name.toLowerCase() : ''
      const clientPhone = client.phone ? client.phone.toString() : ''

      return (
        clientEmail.includes(query) ||
        clientName.includes(query) ||
        clientPhone.includes(query)
      )
    })

    setFilteredClients(filteredClients)
  }

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <Toaster />
      <div className="flex justify-between">
        <h1 className="text-3xl text-bold text-center">Customer Details</h1>
        <div className="flex gap-4">
          <div className="relative">
            {/* Beautiful Search Bar */}
            <input
              type="text"
              className="w-full px-4 py-3 bg-[#EBF0FF] border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Search Clients"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaSearchengin />
            </div>
          </div>

          <button
            className="bg-[#4868B1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowForm(true)}
          >
            Create
          </button>
        </div>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-[1000] bg-opacity-25">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
              <button
                onClick={() => setShowForm(false)}
                className="flex text-xl justify-end w-full text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                X
              </button>
              <h2 className="text-2xl font-semibold text-center mb-6">
                Create New Customer
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      onChange={handleChange}
                      value={userData.name}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                  {/* Phone No */}
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-600">
                      Phone No
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleChange}
                      value={userData.phone}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={userData.email}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>

                {/* Role */}
                <div className="mb-4">
                  <label className="block text-gray-600">Role</label>
                  {RoleOptions.map((role, index) => (
                    <label key={index} className="flex items-center capitalize">
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        onChange={handleChange}
                        checked={userData.role === role}
                        className="mr-2 focus:ring"
                      />
                      <span className="text-gray-700">{role}</span>
                    </label>
                  ))}
                </div>

                {/* Business Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="businessName"
                      className="block text-gray-600"
                    >
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      placeholder="Business Name"
                      onChange={handleChange}
                      value={userData.businessName}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label htmlFor="street" className="block text-gray-600">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="address.street"
                      placeholder="Street Address"
                      onChange={handleChange}
                      value={userData.address.street}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* City */}
                  <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-600">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="address.city"
                      placeholder="City"
                      onChange={handleChange}
                      value={userData.address.city}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>

                  {/* State */}
                  <div className="mb-4">
                    <label htmlFor="state" className="block text-gray-600">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="address.state"
                      placeholder="State"
                      onChange={handleChange}
                      value={userData.address.state}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="mb-4">
                    <label htmlFor="pincode" className="block text-gray-600">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="address.pincode"
                      placeholder="Pincode"
                      onChange={handleChange}
                      value={userData.address.pincode}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>

                  {/* GST (optional) */}
                  <div className="mb-4">
                    <label htmlFor="gst" className="block text-gray-600">
                      GST (optional)
                    </label>
                    <input
                      type="text"
                      id="gst"
                      name="gst"
                      placeholder="GST (optional)"
                      onChange={handleChange}
                      value={userData.gst}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4868B1] text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {loading === true ? (
        <Loading color={'#4868B1'} />
      ) : (
        <div className="rounded-lg overflow-x-auto mt-8">
          <table className="w-full border divide-y rounded-t-md  divide-gray-200">
            <thead className="bg-[#4868B1]  text-white">
              <tr>
                <th className="py-3 pl-4 pr-2 text-left">Name</th>
                <th className="py-3 px-2 text-left">Email</th>
                <th className="py-3 px-2 text-left">Phone No</th>
                <th className="py-3 px-2 text-left">Business Name</th>
                <th className="py-3 px-2 text-left">City</th>
                {/* <th className="py-3 px-2 text-left">Role</th> */}
                {/* <th className="py-3 px-2 text-left">GST</th> */}
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-2 pr-2 border">{user.name}</td>
                  <td className="py-3 px-2 border">{user.email}</td>
                  <td className="py-3 px-2 border">{user.phone}</td>
                  <td className="py-3 px-2 border">{user.businessName}</td>
                  <td className="py-3 px-2 border">{user.address.city}</td>
                  {/* <td className="py-3 px-2 border">{user.role}</td>
                  <td className="py-3 px-2 border">{user.gst}</td> */}
                  <td className="py-3 px-4 flex space-x-2 border">
                    <button
                      className=" text-white font-bold  p-3 rounded"
                      onClick={() => {
                       
                        handleEditSubmit(user._id);
                      }}
                    >
                      <FaPencil className='text-gray-700'/>
                    </button>
                    <button
                      className=" text-white font-bold  p-3 rounded"
                      onClick={() => {
                        handleProductCancel()
                        setUserId(user._id)
                      }}
                    >
                      <FaTrash className='text-gray-700'/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[1000] bg-opacity-25">
          <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
            <button
              onClick={() => setEditFormVisible(false)}
              className="flex text-xl justify-end w-full text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Edit Customer Data
            </h2>
            <form onSubmit={handleEditUser}>
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={userData.name}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                {/* Phone No */}
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-600">
                    Phone No
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    value={userData.phone}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={userData.email}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>

              {/* Role */}
              <div className="mb-4">
                <label className="block text-gray-600">Role</label>
                {RoleOptions.map((role, index) => (
                  <label key={index} className="flex items-center capitalize">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      onChange={handleChange}
                      checked={userData.role === role}
                      className="mr-2 focus:ring"
                    />
                    <span className="text-gray-700">{role}</span>
                  </label>
                ))}
              </div>

              {/* Business Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="businessName" className="block text-gray-600">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="Business Name"
                    onChange={handleChange}
                    value={userData.businessName}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label htmlFor="street" className="block text-gray-600">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="address.street"
                    placeholder="Street Address"
                    onChange={handleChange}
                    value={userData.address.street}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-600">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="address.city"
                    placeholder="City"
                    onChange={handleChange}
                    value={userData.address.city}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>

                {/* State */}
                <div className="mb-4">
                  <label htmlFor="state" className="block text-gray-600">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="address.state"
                    placeholder="State"
                    onChange={handleChange}
                    value={userData.address.state}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>

                {/* Pincode */}
                <div className="mb-4">
                  <label htmlFor="pincode" className="block text-gray-600">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="address.pincode"
                    placeholder="Pincode"
                    onChange={handleChange}
                    value={userData.address.pincode}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>

                {/* GST (optional) */}
                <div className="mb-4">
                  <label htmlFor="gst" className="block text-gray-600">
                    GST (optional)
                  </label>
                  <input
                    type="text"
                    id="gst"
                    name="gst"
                    placeholder="GST (optional)"
                    onChange={handleChange}
                    value={userData.gst}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4868B1] text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        {showNotification && (
          <div className="bg-white border  top-0 fixed z-[1000] rounded-lg p-4 mt-4">
            <p className="text-gray-800 text-lg mb-2">
              Are you sure you want to cancel your plan?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList
