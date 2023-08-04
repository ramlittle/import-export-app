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
const DRYDataTable = ({ data, hiddenColumns, actionButtons }) => {

    // STATES
    const [tableData, setTableData] = useState(data)
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [columnFilters, setColumnFilters] = useState({});
    const [message, setMessage] = useState('')

    // VARIABLES 
    const headers = Object.keys(data[0]); //extra headers
    const filteredHeaders = headers.filter((header) => !hiddenColumns.includes(header));
    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    let tempData = [];
    // const firstRecordIndex = (currentPage - 1) * rowsPerPage + 1; //used for pagination display of how many records
    // const lastRecordIndex = Math.min(firstRecordIndex + rowsPerPage - 1, data.length); //used for pagination display of how many records

    // FUNCTIONS

    //handle record selection
    const handleRowSelect = (id) => {
        if (id === 'all') {
            if (selectedRows.length === tableData.length) {
                setSelectedRows([]);
            } else {
                const allIds = tableData.map((record) => record.id);
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

    // reset button aka filters
    const handleReset = () => {
        alert('you cliecked me')
        setTableData(data)
        setSearchQuery('')
        setSortConfig({ key: null, direction: null })
        setSelectedRows([])
        setColumnFilters([])
        setRowsPerPage(10)
    }

    //handle SingleDelete
    const handleSingleDelete = (recordId) => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        console.log(`you clicked single delete to ${recordId}`)
        const confirmBox = window.confirm(`You are trying to delete record with ID ${recordId}`)
        if (confirmBox) {
            setMessage(`You've deleted record with ID ${recordId}`)
            const newList = tableData.filter(data => {
                return data.id !== recordId
            })
            setTableData(newList)
            tempData = newList
            
            const filteredAndSortedData=applyGlobalSearchAndColumnFilter(tempData); 
            setCurrentData(filteredAndSortedData.slice(startIndex, endIndex));
        }
    }

    //handle selectedDelete
    const handleDeleteSelected=()=>{
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        const newList = tableData.filter(data=>{
            if(!selectedRows.includes(data.id)){
                return data
            }
        })        
        console.log('old list',tableData)
        console.log('newList',newList)
        setTableData(newList)
        
        const filteredAndSortedData=applyGlobalSearchAndColumnFilter(newList); 
        setCurrentData(filteredAndSortedData.slice(startIndex, endIndex));
    }

    const applyGlobalSearchAndColumnFilter=(data)=>{
        // Apply global search
        const filteredData = data.filter((record) =>
            Object.values(record).some((value) =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        // Apply column filters
        const filteredAndSortedData = filteredData.filter((record) =>
            Object.entries(columnFilters).every(([column, filterValue]) =>
                String(record[column]).toLowerCase().includes(filterValue)
            )
        );
        return filteredAndSortedData;
    }
    // EFFECTS

    //handle update of records per pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        const filteredAndSortedData=applyGlobalSearchAndColumnFilter(data);

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
        setTableData(filteredAndSortedData)
    }, [rowsPerPage, currentPage, searchQuery, sortConfig, columnFilters]);

    return (
        <div>
            <div>
                <span>Selected {selectedRows.length} out of {tableData.length} records.</span>
                <button className='ring-2 p-1'onClick={handleDeleteSelected}>Delete</button>
            </div>
            {/* GLOBAL SEARCH */}
            <div>
                <input
                    type="text"
                    placeholder="Global Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleReset}>Reset</button>
                {message}
            </div>
            {/* Select Rows Per Page */}
            <div>
                <label>Rows per page:</label>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={data.length}>All</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <table className='w-full'>
                <thead className='bg-neutral-500 text-white'>
                    {/* Column filters */}
                    <tr className='text-black'>
                        <th></th>
                        {filteredHeaders.map((header, index) => (
                            <th key={index}>
                                <input className='w-[95%] m-2 p-1'
                                    type="text"
                                    placeholder={`Filter ${header}`}
                                    value={columnFilters[header] || ''}
                                    onChange={(e) => handleColumnFilter(header, e.target.value)}
                                />
                            </th>
                        ))}
                        <th></th>
                    </tr>
                    <tr>
                        <th className='ring-2 text-center p-2'>
                            <input
                                type="checkbox"
                                onChange={() => { }}
                                checked={selectedRows.length === tableData.length}
                                onClick={() => handleRowSelect('all')}
                            />
                        </th>
                        {filteredHeaders.map((header, index) => (
                            <th className='ring-2 text-center p-2 text-lg'
                                key={index} onClick={() => handleColumnSort(header)}>
                                {header}
                                {sortConfig.key === header && (
                                    <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>
                                )}
                            </th>
                        ))}
                        <th className='ring-2 text-center p-2 text-lg'>
                            Action
                        </th>
                    </tr>

                </thead>
                <tbody>
                    {currentData.map((record, index) => (
                        <tr key={index}>
                            <td className='ring-2 text-center p-2'>
                                <input
                                    type="checkbox"
                                    onChange={() => handleRowSelect(record.id)}
                                    checked={selectedRows.includes(record.id)}
                                />
                            </td>
                            {filteredHeaders.map((header, index) => (
                                <td className='ring-2 text-center p-2'
                                    key={index}>{record[header]}</td>
                            ))}
                            <td className='flex ring-2 justify-center'>
                                <button className='m-2 ring-2' onClick={() => handleSingleDelete(record.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex gap-2 flex-col ring-2 text-center'>
                <div>
                    <p>
                        {/* Showing {firstRecordIndex} to {lastRecordIndex} of {tableData.length} records */}
                        {
                        rowsPerPage > tableData.length ? 
                        <p>Showing {tableData.length} of {tableData.length} records</p>
                        :
                        <p>Showing {rowsPerPage} of {tableData.length} records</p>
                        }
                        
                    </p>
                </div>
                <div>
                    <p>Pages: {currentPage}/{totalPages}</p>
                </div>
                <div className='flex gap-2 justify-center'>
                    <button onClick={handleFirstPage} disabled={currentPage === 1}>First Page</button>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last Page</button>
                </div>

            </div>

        </div>
    );
};


export default DRYDataTable;