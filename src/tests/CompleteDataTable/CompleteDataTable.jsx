import React, { useState } from 'react';

const initialData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'ricadoo', age: 40, email: 'ricadoob@example.com' },
  { id: 4, name: 'bocadoo', age: 40, email: 'bocadoo@example.com' },
  { id: 5, name: 'rendon', age: 40, email: 'rendonb@example.com' },
  { id: 6, name: 'mooray', age: 40, email: 'mooray@example.com' },
  { id: 7, name: 'grayson', age: 40, email: 'grayson@example.com' },
  { id: 8, name: 'batman', age: 40, email: 'batman@example.com' },
  { id: 9, name: 'flash', age: 40, email: 'flash@example.com' },
  { id: 10, name: 'jenny', age: 40, email: 'jenny@example.com' },
  { id: 11, name: 'chand', age: 40, email: 'chand@example.com' },
  { id: 12, name: 'junyo', age: 40, email: 'hunyo@example.com' },
  { id: 13, name: 'danilo', age: 40, email: 'danilo@example.com' },
  { id: 14, name: 'ameria', age: 40, email: 'ameria@example.com' },
  { id: 15, name: 'katar', age: 40, email: 'katar@example.com' },
  { id: 16, name: 'shoes', age: 40, email: 'shoes@example.com' },
  { id: 17, name: 'keys', age: 40, email: 'keys@example.com' },
  { id: 18, name: 'legs', age: 40, email: 'legs@example.com' },
  { id: 19, name: 'arms', age: 40, email: 'arms@example.com' },
  { id: 20, name: 'singit', age: 40, email: 'singit@example.com' },
  { id: 21, name: 'kati', age: 40, email: 'kati@example.com' },
  { id: 22, name: 'dark', age: 40, email: 'dark@example.com' },
  { id: 23, name: 'malapit', age: 40, email: 'malapit@example.com' },
  { id: 24, name: 'nadin', age: 40, email: 'nadin@example.com' },
  { id: 25, name: 'medyas', age: 40, email: 'medyas@example.com' },
  { id: 26, name: 'avocado', age: 40, email: 'avocado@example.com' },
  // Add more data as needed
];
const itemsPerPage = 5;

const CompleteDataTable = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting function to sort the data based on the column clicked
  const sortData = (key) => {
    let direction = 'asc';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // Search function to filter the data based on the user's search query
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filteredData = initialData.filter((item) => {
      return (
        item.id.toString().toLowerCase().includes(value) ||
        item.name.toLowerCase().includes(value) ||
        item.age.toString().toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
      );
    });
    setData(filteredData);
  };

  // Pagination function to slice data for the current page
  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData('id')}>ID</th>
            <th onClick={() => sortData('name')}>Name</th>
            <th onClick={() => sortData('age')}>Age</th>
            <th onClick={() => sortData('email')}>Email</th>
          </tr>
        </thead>
        <tbody>
          {paginateData(data).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination buttons */}
      <div>
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default CompleteDataTable;