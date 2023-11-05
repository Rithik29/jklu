import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const data = [
  { title: "HUNGAMA", value: 20, color: "#FF6384" },
  { title: "SNAP", value: 10, color: "#36A2EB" },
  { title: "SIP", value: 15, color: "#FFCE56" },
  // Add more data points as needed
];

const months = [
  "January",
  "February",
  "March",
  // Add more months as needed
];
const StreamingCount = () => {
  return (
    <div className="container mx-auto p-4">
       <div className="container mx-auto p-4">
      <div className="w-1/2 mx-auto">
        <PieChart
          data={data}
          label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})`}
          labelPosition={50}
          labelStyle={{
            fontSize: "3px",
            fontFamily: "sans-serif",
          }}
          radius={40}
          animate
        />
      </div>
      <table className="table-auto w-1/2 mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2"></th> 
            {months.map((month, index) => (
              <th key={index} className="px-4 py-2">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{entry.title}</td>
              {months.map((month, mIndex) => (
                <td key={mIndex} className="px-4 py-2">
                  {entry.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default StreamingCount;
