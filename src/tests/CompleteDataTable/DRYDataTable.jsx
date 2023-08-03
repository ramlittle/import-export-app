/**
 * TODO: 1.
 * Features:
Prop data and hidden columns
Check all boxes (obtain id)
Check box per row (obtain id)
Pagination (show current record per page, show many pages, 
Global search
Filter columns with text
Sort data per column
Export
Action buttons shown depending on table data propped
hide some columns not needed by end user but will still be usable by programmer for reference
to avoid changing the .id, let's check data first if has id column, if none, we add it
 * @props data =  obtained when this ocmponent is used
  */
import { useState, useEffect } from 'react'
const DRYDataTable = ({ data, hiddenColumns }) => {

    // STATES
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [columnFilters, setColumnFilters] = useState({});

    // VARIABLES 
    const headers = Object.keys(data[0]); //extra headers
    const filteredHeaders = headers.filter((header) => !hiddenColumns.includes(header));
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const firstRecordIndex = (currentPage - 1) * rowsPerPage + 1; //used for pagination display of how many records
    const lastRecordIndex = Math.min(firstRecordIndex + rowsPerPage - 1, data.length); //used for pagination display of how many records

    // FUNCTIONS

    //handle record selection
    const handleRowSelect = (id) => {
        if (id === 'all') {
            if (selectedRows.length === data.length) {
                setSelectedRows([]);
            } else {
                const allIds = data.map((record) => record.id);
                setSelectedRows(allIds);
            }
        } else {
            if (selectedRows.includes(id)) {
                setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
            } else {
                setSelectedRows([...selectedRows, id]);
            }
        }
    };

    // pagination
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    //sort records based on column selected
    const handleColumnSort = (key) => {
        if (sortConfig.key === key) {
            // Reverse the direction if the same column header is clicked again
            setSortConfig({ key, direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' });
        } else {
            // Set a new column for sorting and set the default direction to ascending
            setSortConfig({ key, direction: 'ascending' });
        }
    };

    // Handle column filtering
    const handleColumnFilter = (column, value) => {
        setColumnFilters((prevFilters) => ({
            ...prevFilters,
            [column]: value.toLowerCase(),
        }));
    };

    // EFFECTS

    //handle update of records per pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        // Apply global search
        const filteredData = data.filter((record) =>
            Object.values(record).some((value) =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        // Apply column filters
        const filteredAndSortedData = filteredData.filter((record) =>
            Object.entries(columnFilters).every(([column, filterValue]) =>
                record[column].toLowerCase().includes(filterValue)
            )
        );

        // Sorting the data based on sortConfig
        if (sortConfig.key) {
            filteredAndSortedData.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        setCurrentData(filteredAndSortedData.slice(startIndex, endIndex));
    }, [data, rowsPerPage, currentPage, searchQuery, sortConfig, columnFilters]);

    // ... (Existing code remains the same)

    return (
        <div>
            <div>
                <p>Selected {selectedRows.length} out of {data.length} records.</p>
            </div>
            {/* GLOBAL SEARCH */}
            <div>
                <input
                    type="text"
                    placeholder="Global Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div>
                <label>Rows per page:</label>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={data.length}>Show All</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            {/* Column filters */}
            <div>
                {filteredHeaders.map((header, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Filter ${header}`}
                        value={columnFilters[header] || ''}
                        onChange={(e) => handleColumnFilter(header, e.target.value)}
                    />
                ))}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={() => { }}
                                checked={selectedRows.length === data.length}
                                onClick={() => handleRowSelect('all')}
                            />
                        </th>
                        {filteredHeaders.map((header, index) => (
                            <th key={index} onClick={() => handleColumnSort(header)}>
                                {header}
                                {sortConfig.key === header && (
                                    <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((record, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleRowSelect(record.id)}
                                    checked={selectedRows.includes(record.id)}
                                />
                            </td>
                            {filteredHeaders.map((header, index) => (
                                <td key={index}>{record[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <p>
                    Showing {firstRecordIndex} to {lastRecordIndex} of {data.length} records.
                </p>
                <button onClick={handleFirstPage} disabled={currentPage === 1}>First Page</button>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last Page</button>
            </div>

        </div>
    );
};


export default DRYDataTable;