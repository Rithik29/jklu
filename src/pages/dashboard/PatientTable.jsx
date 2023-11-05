import React from 'react'

const PatientQueueTable = () => {
  const patients = [
    {
      name: 'John Doe',
      joiningDate: '2023-11-04 10:00 AM',
      email: 'john@example.com',
    },
    {
      name: 'Jane Smith',
      joiningDate: '2023-11-04 11:30 AM',
      email: 'jane@example.com',
    },
    // Add more patient data as needed
  ]

  return (
    <div>
      <h1 className="text-black text-3xl my-4">Patient Queue</h1>
      <table className="min-w-full border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="p-2 border border-gray-500 text-start bg-gray-200/50">
              Patient Name
            </th>
            <th className="p-2 border border-gray-500 text-start bg-gray-200/50">
              Joining Date
            </th>
            <th className="p-2 border border-gray-500 text-start bg-gray-200/50">
              Email
            </th>
            <th className="p-2 border border-gray-500 text-start bg-gray-200/50">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300">{patient.name}</td>
              <td className="p-2 border border-gray-300">
                {patient.joiningDate}
              </td>
              <td className="p-2 border border-gray-300">{patient.email}</td>
              <td className="p-2 border border-gray-300">
                <button className="bg-[#1B263B]  text-base  text-white px-4 py-2 rounded-lg ">
                  Query Entry
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PatientQueueTable
