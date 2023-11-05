import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Dropzone from 'react-dropzone';

const ExcelUploader = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setExcelData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload an Excel File</h2>
      <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="bg-white p-4 border-dashed border-2 border-gray-300 rounded-lg text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-gray-500">Drag 'n' drop an Excel file here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      {excelData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Excel Data</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  {excelData[0].map((header, index) => (
                    <th
                      key={index}
                      className="bg-gray-100 border border-gray-300 px-4 py-2"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
