import React, { useState } from 'react';

const data = [
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

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);

  // Function to perform the global search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const compareValues = (value1, value2) => {
    if (typeof value1 === "string" && typeof value2 === "string") {
      return sortOrder === "asc" ? value1.localeCompare(value2) : value2.localeCompare(value1);
    } else {
      return sortOrder === "asc" ? value1 - value2 : value2 - value1;
    }
  };

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortColumn) {
        return compareValues(a[sortColumn], b[sortColumn]);
      }
      return 0;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate an array of page numbers [1, 2, 3, ...]
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Function to handle changing items per page
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset pagination when changing items per page
  };

  // Function to handle the "Next" button click
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle the "Previous" button click
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalRecords = data.length;

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="entries-per-page">
        <label>Show entries:</label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <p className="record-info">
        Showing {currentItems.length} of {totalRecords} records
      </p>
    </div>
  );
};

export default DataTable;