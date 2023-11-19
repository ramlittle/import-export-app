import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import SampleData from './sampleData.json'
const ImportExport = () => {
    const [excelData, setExcelData] = useState(null);
    const [sampleData, setSampleData] = useState(SampleData)

    // IMPORT
    function handleFileChange(e) {
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
            setExcelData(jsonData);
        };
        reader.readAsArrayBuffer(file);
    }

    // EXPORT
    function handleExportCopy(tableId) {
        const selectedDiv = document.getElementById(tableId);
        if (!selectedDiv) {
            console.error('Invalid tableId provided.');
            return;
        }

        // Get the content of the selected div
        const wb = XLSX.utils.table_to_book(selectedDiv);

        // Convert the workbook to a binary Excel file
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        // Save the Excel file using FileSaver.js
        const filename = 'exportedData.xlsx';
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, filename);
    }

    useEffect(() => {
        console.log('data here', excelData)
    }, [excelData])
    return (
        <>
            <div>
                Import
                <input
                    type="file"
                    onChange={handleFileChange}
                />
            </div>
            {
                excelData !== null ?
                    <div>
                        <h2>Preview of imported file below</h2>
                        <table className=" text-black p-2">
                            <thead>
                                <tr>
                                    <th className="p-2 ">SYSTEM ID</th>
                                    <th className="p-2 ">PROFESSION</th>
                                    <th className="p-2 ">TAX CODE</th>
                                    <th className="p-2 ">EWT</th>
                                    <th className="p-2 ">PERCENTAGE TAX</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    excelData.map((obj, index) => (
                                        <tr index={index}>
                                            <td className="p-2 ">{obj.system_id}</td>
                                            <td className="p-2 ">{obj.profession}</td>
                                            <td className="p-2 ">{obj.tax_code}</td>
                                            <td className="p-2 ">{obj.ewt}</td>
                                            <td className="p-2 ">{obj.pt}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <button className="p-2 border border-slate-500 rounded">Save</button>
                    </div>
                    :
                    null
            }

            <div>
                <button className="p-2 border border-slate-500 bg-black text-white rounded m-2" onClick={() => handleExportCopy('tableToExport')}>Export Copy</button>
                <table className=" bg-black text-white p-2" id='tableToExport'>
                    <thead>
                        <tr>
                            <th className="p-2 ">SYSTEM ID</th>
                            <th className="p-2 ">PROFESSION</th>
                            <th className="p-2 ">TAX CODE</th>
                            <th className="p-2 ">EWT</th>
                            <th className="p-2 ">PERCENTAGE TAX</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sampleData.map((obj, index) => (
                                <tr index={index}>
                                    <td className="p-2 ">{obj.system_id}</td>
                                    <td className="p-2 ">{obj.profession}</td>
                                    <td className="p-2 ">{obj.tax_code}</td>
                                    <td className="p-2 ">{obj.ewt}</td>
                                    <td className="p-2 ">{obj.pt}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}
export default ImportExport;