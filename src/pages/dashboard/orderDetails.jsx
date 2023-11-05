import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../../API';

import adminRoutes from '../../layouts/adminRoutes';
import { setSidenavType } from '../../context';
import { Sidenav } from '../../layout';

const OrderDetails = () => {
  const [order, setOrder] = useState("");
  const [customerData, setCustomerData] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = new URL(window.location.href);
  const pathnameParts = url.pathname.split('/');
  const id = pathnameParts[pathnameParts.indexOf('dashboard') + 2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(`${api}order/${id}`);
        const customerId = orderResponse.data.order.customer;
        const [customerResponse] = await Promise.all([
          axios.get(`${api}user/${customerId}`),
        ]);

        setOrder(orderResponse.data.order);
        console.log(orderResponse.data.order.order_status)
        setOrderStatus(orderResponse.data.order.order_status)
        // console.log(orderResponse.data.order);
        setProducts(orderResponse.data.order.products);
        setCustomerData(customerResponse.data.user);
        console.log(customerResponse.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const [orderStatus, setOrderStatus] = useState('Pending');

  
  
  const handleStatusUpdate = async (newStatus) => {
    setOrderStatus(newStatus);
    try {
  
      const statusTransitions = {
        Pending: {
          Accepted: true,
          Rejected: true,
        },
        Accepted: {
          Fulfilled: true,
          'Not Fulfilled': true,
        },
      };
  
      if (!statusTransitions[order.order_status]) {
        toast.error(`Invalid status transition from "${order.order_status}" to "${newStatus}".`);
        return;
      }
  
      let reason = null;
  
      
      if ((newStatus === 'Not Fulfilled' || newStatus === 'Rejected') &&
          statusTransitions[order.order_status][newStatus]) {
        reason = prompt(`Please provide a reason for changing status from "${order.order_status}" to "${newStatus}":`);
        if (reason === null) {
      
          return;
        }
      }
  
      const response = await axios.patch(`${api}order/${order._id}`, {
        newStatus: newStatus,
        reason: reason,
      });
  
      console.log('Status updated successfully:', response.data);
      toast.success(`Order Status "${newStatus}" Updated Successfully!`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  function getStatusColor(orderStatus) {
    switch (orderStatus) {
      case 'Pending':
        return 'text-blue-600';
      case 'Accepted':
        return 'text-green-600';
      case 'Rejected':
        return 'text-red-600';
      case 'Fulfilled':
        return 'text-green-600';
      case 'Not Fulfilled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
  
  console.log(order);
  return (
    <div className='bg-blue-gray-50/50'>
    <Sidenav
        routes={adminRoutes}
        brandImg={
          setSidenavType === "white" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        brandName="Dr. Beri"
      />
    <div className=" lg:ml-80 min-h-screen mx-8 py-4">
      <Toaster />
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Order Details</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error fetching data: {error.message}</p>
        ) : (
          <div>

<div className="my-4">
  {/* Customer Details Section */}
  <div className="mb-8">
    <h2 className="text-2xl font-600 mb-4">Customer Info</h2>
    <div className="w-full mx-auto border rounded-lg p-4 bg-white shadow-md">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-semibold">Name:</td>
            <td>{customerData.name}</td>
          </tr>
          <tr>
            <td className="font-semibold">Email:</td>
            <td>{customerData.email}</td>
          </tr>
          <tr>
            <td className="font-semibold">Phone:</td>
            <td>{customerData.phone}</td>
          </tr>
          <tr>
            <td className="font-semibold">Business Name:</td>
            <td>{customerData.businessName}</td>
          </tr>
          <tr>
            <td className="font-semibold">GST:</td>
            <td>{customerData.gst}</td>
          </tr>
          <tr>
            <td className="font-semibold">Address:</td>
            <td>{customerData.address.street}</td>
          </tr>
          <tr>
            <td className="font-semibold">City:</td>
            <td>{customerData.address.city} - {customerData.address.pincode}</td>
          </tr>
         
         
        </tbody>
      </table>
    </div>
  </div>

  {/* Order Details Section */}
  <div>
    <h2 className="text-2xl font-500 mb-4">Order Info</h2>
    <div className="w-full mx-auto border rounded-lg p-4 bg-white shadow-md">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-semibold">Order Date:</td>
            <td>
              {new Date(order.orderDate).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Order Status:</td>
            <td className={`text-lg ${getStatusColor(order.order_status)}`}>
              {order.order_status}
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Total Amount:</td>
            <td>₹{order.totalAmount}</td>
          </tr>
          <tr>
            <td className="font-semibold">Order Remarks:</td>
            <td>{order.reason}</td>
          </tr>
         
        </tbody>
      </table>
    </div>
  </div>
</div>


  { (orderStatus === "Pending" || orderStatus === "Accepted") &&
<div className="my-8">
      <h2 className="text-2xl font-[500]">Order Status</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {orderStatus === 'Pending' && (
          <>
            <button
              onClick={() => handleStatusUpdate('Accepted')}
              className={`status-button text-white px-4 py-2 rounded-md text-lg ${
                orderStatus === 'Pending' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
              }`}
            >
              Accept
            </button>
            <button
              onClick={() => handleStatusUpdate('Rejected')}
              className={`status-button text-white px-4 py-2 rounded-md text-lg ${
                orderStatus === 'Pending' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'
              }`}
            >
              Reject
            </button>
          </>
        )}
        {orderStatus === 'Accepted' && (
          <>
            <button
              onClick={() => handleStatusUpdate('Fulfilled')}
              className="status-button text-white px-4 py-2 rounded-md text-lg bg-green-500 hover:bg-green-600"
            >
              Fulfill
            </button>
            <button
              onClick={() => handleStatusUpdate('Not Fulfilled')}
              className="status-button text-white px-4 py-2 rounded-md text-lg bg-red-500 hover:bg-red-600"
            >
              Not Fulfilled
            </button>
          </>
        )}
      </div>
    </div>
}
            <div className="mt-8">
  <h2 className="text-2xl font-500">Order Items</h2>
  <table className="w-full mt-4 text-left rounded-lg table-auto">
    <thead className='rounded-lg'>
      <tr className="bg-[#4868B1] text-white rounded-lg">
        <th className="px-4 py-2">Product Name</th>
        <th className="px-4 py-2">Quantity</th>
        <th className="px-4 py-2">Price</th>
        <th className="px-4 py-2">Total</th>
      </tr>
    </thead>
    <tbody>
      {products.map((item, i) => (
        <tr key={i}>
          <td className="border px-4 py-2">{item.productName}</td>
          <td className="border px-4 py-2">{item.quantity}</td>
          <td className="border px-4 py-2">₹{item.productPrice.toFixed(2)}</td>
          <td className="border px-4 py-2">
          ₹{(item.quantity * item.productPrice).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



           

           
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default OrderDetails;
