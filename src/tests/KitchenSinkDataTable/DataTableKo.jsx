import DataTable from 'react-data-table-component';


const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        filterable: true,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        filterable: true,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

const DataTableKo=()=> {
    return (
        <DataTable
            columns={columns}
            data={data}
            selectableRows
        />
    );
};

export default DataTableKo;