import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../../API'

import 'tailwindcss/tailwind.css' // Include Tailwind CSS
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import { FaEye } from 'react-icons/fa6'

const AdminOrder = () => {
  
  const [orders, setOrders] = useState([])
 
  const [customerData, setCustomerData] = useState(null)
  const [showCustomerDetails, setShowCustomerDetails] = useState(false)
  const [loading, setLoading] = useState(false);
  const [filterOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  useEffect(() => {
    setLoading(true);
    const getOrders = async () => {
      try {
        const response = await axios.get(`${api}order`);
  
        // Sort orders by createdDate in ascending order
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
  
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
        console.log(sortedOrders);
        setLoading(false);
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    };
  
    getOrders();
  }, []);
  
  

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status)
    if (status === 'All') {
      setFilteredOrders(orders)
    } else {
      const filtered = orders.filter((order) => order.order_status === status)
      setFilteredOrders(filtered)
    }
  }

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600'
      case 'Fulfilled':
        return 'text-green-600'
      case 'Accepted':
        return 'text-green-600'
      case 'Rejected':
        return 'text-red-600'
      case 'Not Fulfilled':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-8 text-left">Admin Orders</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="space-x-4">
          <button
            onClick={() => handleStatusFilterChange('All')}
            className={`${
              statusFilter === 'All'
                ? 'bg-[#4868B1] text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-md focus:outline-none hover:bg-[#4868B1] hover:text-white transition`}
          >
            All Orders
          </button>
          <button
            onClick={() => handleStatusFilterChange('Pending')}
            className={`${
              statusFilter === 'pending'
                ? 'bg-yellow-700 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-md focus:outline-none hover:bg-yellow-700 hover:text-white transition`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => handleStatusFilterChange('Accepted')}
            className={`${
              statusFilter === 'approved'
                ? 'bg-green-700 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 hover:text-white transition`}
          >
            Accepted Orders
          </button>
          <button
            onClick={() => handleStatusFilterChange('Rejected')}
            className={`${
              statusFilter === 'rejected'
                ? 'bg-red-700 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 hover:text-white transition`}
          >
            Rejected Orders
          </button>
          <button
            onClick={() => handleStatusFilterChange('Fulfilled')}
            className={`${
              statusFilter === 'Fulfilled'
                ? 'bg-green-700 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 hover:text-white transition`}
          >
            FulFilled Orders
          </button>
          <button
            onClick={() => handleStatusFilterChange('Not Fulfilled')}
            className={`${
              statusFilter === 'Not Fulfilled'
                ? 'bg-red-700 text-white'
                : 'bg-gray-300 text-gray-600'
            } px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 hover:text-white transition`}
          >
            Not FulFilled Orders
          </button>
          
        </div>
      </div>
     
      {
  loading === true ? <Loading color={'#4868B1'}/> : 
      <div className="rounded-lg overflow-x-auto text-center">
        <table className="min-w-full bg-[#4868B1] table-auto border-collapse">
          <thead className='text-white text-center'>
            <tr>
              <th className="border border-blue-600 px-2  py-2  ">
                Order Number
              </th>
              <th className="border border-blue-600 px-4 py-2  ">
                Created Date
              </th>
              
              <th className="border border-blue-600 px-4 py-2  ">
                Order Quantity
              </th>
              <th className="border border-blue-600 px-4 py-2  ">
                Order Value
              </th>
              <th className="border border-blue-600 px-4 py-2  ">
                Status
              </th>

              <th className="border border-blue-600 px-4 py-2  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filterOrders.map((order, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-blue-600 px-2 py-2">{`Order ${
                  index + 1
                }`}</td>
                <td className="border border-blue-600 px-4 py-2">
                  {new Date(order.orderDate).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>

                <td className="border border-blue-600 px-4 py-2">{`${order.totalQuantity}`}</td>
                <td className="border border-blue-600 px-4 py-2">{`₹${order.totalAmount.toFixed(
                  2,
                )}`}</td>

                <td
                  className={`border border-blue-600 px-4 py-2 ${getStatusColorClass(
                    order.order_status,
                  )}`}
                >
                  {order.order_status}
                </td>
            
                <td className="border border-blue-600 p-3">
                  <Link to={`/dashboard/orderDetail/${order._id}`}>
                  <button
                     
                    className="px-4 py-2 text-white rounded  focus:outline-none focus:bg-blue-700"
                  >
                    <FaEye className='text-gray-700'/>
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }

    </div>
  )
}

export default AdminOrder
