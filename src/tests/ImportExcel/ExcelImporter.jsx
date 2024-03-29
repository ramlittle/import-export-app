
import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { addTitle, insertAfterSpecificKey, knowDivider } from './functions.js'

const ExcelImporter = () => {

    const [excelData, setExcelData] = useState(null);
    const [payListTitle, setPaylistTitle] = useState('')
    const [divider, setDivider] = useState(0);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming there's only one sheet in the Excel file
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Parse the sheet data and save it in the state
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log('here json data', jsonData)
            const targetKey = "Total Earned";
            const newKey = "LESS DEDUCTIONS";
            const newValue = "";
            const updatedArray = insertAfterSpecificKey(jsonData);
            console.log(updatedArray);
            setDivider(knowDivider(updatedArray));
            console.log('heres the official divider', divider)
            setExcelData(addTitle(updatedArray, payListTitle));
        };

        reader.readAsArrayBuffer(file);
    };

    useEffect(() => {
        console.log('here is now your new excel data', excelData);
    }, [excelData]);

    return (
        <>
            <div>
                <input
                    className='p-1 m-1'
                    type='text' value={payListTitle}
                    onChange={(e) => { setPaylistTitle(e.target.value) }}
                    placeholder='Title - ex: May 1-15, 2023'
                />
            </div>
            <div>
                {
                    payListTitle &&
                    <input
                        className='p-1'
                        type="file"
                        onChange={handleFileChange}
                    />
                }
            </div>
            {/* {excelData && (
                <div>
                    <h2>Excel Data:</h2>
                    <pre>{JSON.stringify(excelData, null, 1)}</pre>
                </div>
            )} */}
            <div className='flex flex-wrap border border-red-500'>
                {
                    excelData &&
                    excelData.map((obj, index) => (
                        <div key={index} className='flex flex-col ring-2 w-[30%] m-5 p-5 bg-white '>
                            <div className='flex flex-col border-green-500 items-center'>
                                <strong>Payroll Payment Slip</strong>
                                <strong>DOH-CAR, Baguio City</strong>
                                <strong>{obj.title}</strong>
                            </div>
                            <div className=''>
                                <table className='ring-2 w-full text-xs'>
                                    <tbody>
                                        {Object.entries(obj).map(([key, value], index) => (
                                            <tr key={key}>
                                                {/* {console.log('index',index)} */}
                                                {
                                                    key === 'Net Amount' || key === 'Employee Name' || key === 'Basic Salary' ?
                                                        <>
                                                            <td><strong>{key}</strong></td>
                                                            <td ><strong className='ml-10'><u>{value}</u></strong></td>
                                                        </>
                                                        :
                                                        key === 'Total Earned' ?
                                                            <>
                                                                <td>{key}</td>
                                                                <td ><strong className='ml-5 overline'><u>{value}</u></strong></td>

                                                            </>
                                                            :
                                                            key === 'Total Deductions' ?
                                                                <>
                                                                    <td>{key}</td>
                                                                    <td ><strong className='ml-5 overline'><u>{value}</u></strong></td>
                                                                </>
                                                                :
                                                                key === 'title' ?
                                                                    null
                                                                    :

                                                                    index > divider ?
                                                                        <>
                                                                            {console.log('dividier here', divider, 'index here', index)}
                                                                            <td ><span className='ml-5'>{key}</span></td>
                                                                            <td><span className='ml-5'>{value} </span></td>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <td className=''>{key}</td>
                                                                            <td><span className='ml-5'>{value} </span></td>
                                                                        </>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ExcelImporter;