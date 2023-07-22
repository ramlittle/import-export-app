import React, { useState } from 'react';

const initialData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
  // Add more data as needed
];

const CompleteDataTable = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState('');
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
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default CompleteDataTable;