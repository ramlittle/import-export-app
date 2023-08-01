import KitchenSinkStory from 'react-data-table-component';

const KitchenSinkDataTable = () => {
    const data = [
        { name: 'Mark', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Gloria', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Wilmer', age: 36, gender: 'female', address: '38 hooray' },
        { name: 'Mailmer', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'HOoray', age: 36, gender: 'ironmale', address: '38 hooray' },
        { name: 'Dooray', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Sam', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Genny', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'House', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Horse', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Moria', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Gecko', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Shoes', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Goose', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Miles', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Dice', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Keys', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Mejas', age: 36, gender: 'male', address: '38 hooray' },
        { name: 'Phones', age: 36, gender: 'male', address: '38 hooray' },
    ]
    const columns = [
        {
            name: 'Name',
            selector: (row) => row.name,
            wrap:true
        },
        {
            name: 'Age',
            selector: (row) => row.age,

        },
        {
            name: 'Gender',
            selector: (row) => row.gender,

        },
        {
            name: 'Address',
            selector: (row) => row.address
        },

    ]

    return (
        <>
            <KitchenSinkStory
                direction='auto'
                fixedHeader={true}
                columns={columns}
                data={data}
                highlightOnHover={true}
                pagination
                selectableRows={true}
                selectableRowsHighlight={true}
            />
        </>
    )
}

export default KitchenSinkDataTable;