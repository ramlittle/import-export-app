import ArrowDisplay from './ArrowDisplay';

const data = [
    { name: 'Item 1', description: 'Description for Item 1' },
    { name: 'Item 2', description: 'Description for Item 2' },
    { name: 'Item 3', description: 'Description for Item 3' },
    // Add more items as needed
  ];

const Index = ()=>{
    return (
        <>
            <ArrowDisplay data={data}/>
        </>
    )
}

export default Index;