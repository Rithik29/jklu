import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { api } from '../../API';
import axios from 'axios';



const filterOptions = ["Album", "Catalog Number", "UPC", "Language"];

const HistoryPage = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('Album');

  const handleFilterChange = (e) => {
    const updatedFilters = { ...filters, [selectedFilter]: e.target.value };
    setFilters(updatedFilters);
  };

  const clearFilter = () => {
    setFilters({}); // Clear all filters
  };

  const columns = [
    '#',
    'Inlay',
    'Album',
    'Catalog Number',
    'UPC',
    'Sub-Label',
    'Language',
    'Spotify',
    'Facebook_AAP WW',
    'Facebook_SRP WW',
    'Wynk',
    'JioSaavn',
    'Amazon IN',
    'RESSO-Bytedance',
    'Gaana',
    'iTunes',
    'YouTubeCMS',
    'SoundCloud',
    'AtlantisCRBT',
    'Jio CRBT',
    'Pandora',
    'Deezer',
    'Snap',
    'Anghami',
    'Tiktok ByteDance',
    'Facebook',
    'Hungama',
    'Others',
    'Upload Date',
    'Go Live Date',
    'Submission Date',
    'Submission Time',
    'Uploaded By',
    'Verified By',
    'Verified On'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmU5MzBiZTUzMGNlN2M0MTZkMmJjNyIsImlhdCI6MTY5NzY1MjA1MX0.v0RuLczjkAZgkT535utOIRuRmCDBuBei2kl0u1VLhRg";
        const apiUrl = `${api}/history`;

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the Content-Type header
        };

        console.log("Request URL: ", apiUrl); // Log the complete URL

        const response = await axios.get(apiUrl, { headers });
         console.log(response.data.data)
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const filteredData = data.filter((item) => {
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
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-blue-500 text-white">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="py-2 px-4">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{item.inlay}</td>
              <td className="py-2 px-4">{item.Album}</td>
              <td className="py-2 px-4">{item.CatalogNumber}</td>
              <td className="py-2 px-4">{item.UPC}</td>
              <td className="py-2 px-4">{item.subLabel}</td>
              <td className="py-2 px-4">{item.Language}</td>
              <td className="py-2 px-4">{item.spotify}</td>
              <td className="py-2 px-4">{item.Facebook_AAPWW}</td>
              <td className="py-2 px-4">{item.Facebook_SRPWW}</td>
              <td className="py-2 px-4">{item.JioSaavn}</td>
              <td className="py-2 px-4">{item.AmazonIN}</td>
              <td className="py-2 px-4">{item.RESSOBytedance}</td>
              <td className="py-2 px-4">{item.Gaana}</td>
              <td className="py-2 px-4">{item.iTunes}</td>
              {/* <td className="py-2 px-4">{item.YouTubeCMS}</td> */}
              <td className="py-2 px-4">{item.AtlantisCRBT}</td>
              <td className="py-2 px-4">{item.JioCRBT}</td>
              <td className="py-2 px-4">{item.Deezer}</td>
              <td className="py-2 px-4">{item.Snap}</td>
              <td className="py-2 px-4">{item.TiktokByteDance}</td>
              <td className="py-2 px-4">{item.Facebook}</td>
              <td className="py-2 px-4">{item.Hungama}</td>
              <td className="py-2 px-4">{item.createdAt}</td>
              <td className="py-2 px-4">{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default HistoryPage;
