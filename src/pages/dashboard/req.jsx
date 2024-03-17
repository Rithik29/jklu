import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { FaPencil } from 'react-icons/fa6';
import Temp from './temp'
import { useNavigate } from 'react-router-dom';


const Req = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchPatients() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/patients');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  const getRandomTime = () => {
    const currentDate = new Date();
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    currentDate.setHours(randomHours, randomMinutes, 0, 0);
    return currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    
    <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <Toaster />
      <h1 className="text-4xl text-cyan-600 mb-4">Upcoming Meetings</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="rounded-lg overflow-x-auto mt-8">
          <table className="w-full border divide-y divide-gray-200">
            <thead className="bg-cyan-700 text-white">
              <tr>
                <th className="py-3 pl-4 pr-2 text-left">Name</th>
                <th className="py-3 px-2 text-left">Email</th>
                <th className="py-3 px-2 text-left">Phone No</th>
                <th className="py-3 px-2 text-left">Address</th>
                <th className="py-3 px-2 text-left">Notes</th>
                <th className="py-3 px-2 text-left">Time</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 4).map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-2  border">{user.name}</td>
                  <td className="py-3 px-2 border">{user.email}</td>
                  <td className="py-3 px-2 border">{user.phone}</td>
                  <td className="py-3 px-2 border">{user.address}</td>
                  <td className="py-3 px-2 border">{user.notes}</td>
                  <td className="py-3 px-2 border">{getRandomTime()}</td>
                  <td className="py-3 px-4 flex space-x-2 border">
                    <button
                      className="text-white font-bold p-2 rounded bg-green-500"
                      onClick={() => {
                        navigate('/dashboard/temp');
                      }}
                     
                    >
                      Join
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Req;
