const ViewRecord =(recordId)=>{
    console.log('VIEW RECORD recordID',recordId)
    return(
        <>
            <h2>You are viewering record{recordId.recordId}</h2>
        </>
    )
}
export default ViewRecord;