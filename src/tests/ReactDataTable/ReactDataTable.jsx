import {fetchData} from './api';
import {useEffect}from 'react'
const ReactDataTable=()=>{

    useEffect(()=>{
        fetchData();
        console.log('fetchData',fetchData())
    },[])
    
    return(
        <>
        </>
    )
}

export default ReactDataTable;