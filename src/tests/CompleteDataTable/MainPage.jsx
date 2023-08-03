import DRYDataTable from './DRYDataTable';
import data from './sampleData.json'

const hiddenColumns = ['id'];

const MainPage = () => {
    return (
        <>

            <h1>Data Table Here</h1>
            <DRYDataTable
                data={data}
                hiddenColumns={hiddenColumns}
            />

        </>
    )
}
export default MainPage;