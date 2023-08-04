import DRYDataTable from './DRYDataTable';
import data from './sampleData.json'
import {hiddenColumns,ACTIONS} from './functions.js'
import {useState} from 'react'
import ViewRecord from './ViewRecord.jsx'

const MainPage = () => {
    const [showViewRecord,setShowViewRecord]=useState(false)
    const [recordId,setRecordId]=useState(0)

    const buttons = (action, recordId) => {
        console.log('you called main hooray', action, recordId)
        switch (action) {
            case ACTIONS.VIEW: handleViewRecord(recordId); break;
            case ACTIONS.BENEFITS: console.log('BENEFITS worked'); break;
            case ACTIONS.DEDUCTIONS: console.log('DEDUCTIONS worked'); break;
            case ACTIONS.ALLOWANCES: console.log('ALLOWANCES worked'); break;
            default: return
        }
    }
    
    const handleViewRecord=(recordId)=>{
        console.log('MAINPAGE recordID',recordId)
        setShowViewRecord(true)
        setRecordId(recordId)
    }

    const onClose=()=>{
        setShowViewRecord(false)
    }

    return (
        <>
            <h1>Data Table Here</h1>
            {
                showViewRecord &&
                <div>
                    <button onClick={onClose}>Close</button>
                    <ViewRecord
                        recordId={recordId}
                    />
                </div>
            }
            {
                !showViewRecord &&
                <DRYDataTable
                    data={data}
                    hiddenColumns={hiddenColumns}
                    ACTIONS={ACTIONS}
                    buttons={buttons}
                />
            }
        </>
    )
}

export default MainPage;