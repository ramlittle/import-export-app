
import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { addTitle } from './functions.js'

const ExcelImporter = () => {

    const [excelData, setExcelData] = useState(null);
    const [payListTitle, setPaylistTitle] = useState('')

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
            setExcelData(addTitle(jsonData, payListTitle));

        };

        reader.readAsArrayBuffer(file);
    };

     return (
        <>
            <div>
                <input type='text' value={payListTitle} onChange={(e) => { setPaylistTitle(e.target.value) }} />
            </div>
            <div>
                {
                    payListTitle &&
                    <input type="file" onChange={handleFileChange} />
                }
            </div>
            <div className='flex flex-wrap border border-red-500'>
                {
                    excelData &&
                    excelData.map((obj, index) => (
                        <div key={index} className='flex flex-col ring-2 w-[40%] m-5 p-5'>
                            <div className='flex flex-col border-green-500 items-center'>
                                <strong>Payroll Payment Slip</strong>
                                <strong>DOH-CAR, Baguio City</strong>
                                <strong>{obj.title}</strong>
                            </div>
                            <div>
                                <table className=''>
                                    {Object.entries(obj).map(([key, value]) => (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
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