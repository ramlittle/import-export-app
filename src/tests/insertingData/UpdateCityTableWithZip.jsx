import Cities from './cities.json'
import ZipCodes from './zipcodes.json'

const UpdateCityTableWithZip=()=>{
    const zipList=ZipCodes;
    const cityList=Cities;
    let newList=[];

    // FUNCTIONS
    function createList(cityList,newList){
        for(let i=0;i<cityList.length;i++){
            newList.push({
                city_id: '',
                region_id:'',
                province_id: '',
                city_name: '',
                zip_code:''
            })
        }
    }

    function insertZipsToNewList(newList,zipList,cityList){
        console.log('here is the new emptylist',newList)
        console.log('zip',zipList.length)
        console.log('city',cityList.length)

        for(let i=0;i<cityList.length;i++){
            for(let j=0;j<zipList.length;j++){
                if(cityList[i].city_name==zipList[j].city){
                    newList[i].zip_code=zipList[j].zipcode;
                    break;
                }
            }
            newList[i].city_id=cityList[i].city_id;
            newList[i].region_id=cityList[i].region_id;
            newList[i].province_id=cityList[i].province_id;
            newList[i].city_name=cityList[i].city_name;
        }
        console.log('after insertion here new list',newList)
    }

    

    // PROCESS DATA
    createList(cityList,newList)
    insertZipsToNewList(newList,zipList,cityList);
    return (
        <>
        {/* <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="divToExport"
                    filename="exportedData"
                    sheet="sheet1"
                    buttonText="Download Excel"
                /> */}
            <table border='1' id='divToExport'>
                <thead>
                <tr>
                    <td>city id</td>
                    <td>region id</td>
                    <td>province id</td>
                    <td>city name</td>
                    <td>zip code</td>
                </tr>
                </thead>
                <tbody>
                {
                    newList.map(list=>(
                        <tr key={list.city_id}>
                            <td>{list.city_id}</td>
                            <td>{list.region_id}</td>
                            <td>{list.province_id}</td>
                            <td>{list.city_name}</td>
                            <td>{list.zip_code}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default UpdateCityTableWithZip;