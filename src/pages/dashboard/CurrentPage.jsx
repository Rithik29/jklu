import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { api } from '../../API';

const initialData = [
  {
    Album: 'Album 1',
    CatalogNumber: '12345',
    UPC: 'ABC123',
    Language: 'English',
  },
  {
    Album: 'Album 2',
    CatalogNumber: '67890',
    UPC: 'XYZ789',
    Language: 'Spanish',
  },
  // Add more data entries
];

const filterOptions = ["Album", "Catalog Number", "UPC", "Language"];

const CurrentPage = () => {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('Album');

  const handleFilterChange = (e) => {
    const updatedFilters = { ...filters, [selectedFilter]: e.target.value };
    setFilters(updatedFilters);
  };

  const clearFilter = () => {
    setFilters({}); // Clear all filters
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmU5M3BiZTUzMGNlN2M0MTZkMmJjNyIsImlhdCI6MTY5NzY1MjA1MX0.v0RuLczjkAZgkT535utOIRuRmCDBuBei2kl0u1VLhRg";
        const apiUrl = `${api}/current`; // Store the complete URL in a variable
  
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        console.log("Request URL: ", apiUrl); // Log the complete URL
  
        const response = await axios.get(apiUrl, { headers });
  
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const filteredData = initialData.filter((item) => {
      return filterOptions.every((key) => {
        const filterValue = filters[key]?.toString().toLowerCase(); // Convert to lowercase if defined
        const itemValue = item[key];
        if (key === 'catalog number') {
          // Treat Catalog Number as numbers
          return !filterValue || (itemValue && itemValue.toString().includes(filterValue));
        } else {
          // For other keys, treat them as strings
          return !filterValue || (itemValue && itemValue.toString().toLowerCase().includes(filterValue));
        }
      });
    });
    setData(filteredData);
  }, [filters]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CONTENT STATUS HISTORY (Platform wise)</h1>
      <div className="mb-4 flex items-center">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="p-2 m-2 border rounded-lg"
        >
          {filterOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="relative">
          <input
            type="text"
            placeholder={`Enter ${selectedFilter}`}
            value={filters[selectedFilter] || ''}
            onChange={handleFilterChange}
            className="p-2 m-2 border rounded-lg pl-10"
          />
          {filters[selectedFilter] && (
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="absolute w-6 h-6 text-red-500 right-3 top-3 cursor-pointer"
              onClick={clearFilter}
            />
          )}
          <FontAwesomeIcon icon={faSearch} className="absolute w-6 h-6 text-gray-500 left-3 top-3" />
        </div>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4">Album</th>
            <th className="py-2 px-4">Catalog Number</th>
            <th className="py-2 px-4">UPC</th>
            <th className="py-2 px-4">Language</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2 px-4">{item.Album}</td>
              <td className="py-2 px-4">{item.CatalogNumber}</td>
              <td className="py-2 px-4">{item.UPC}</td>
              <td className="py-2 px-4">{item.Language}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentPage;
