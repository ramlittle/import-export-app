const MyLabel=({htmlFor,value})=>{
    return(
        <>
            <label 
                htmlFor={htmlFor}
            >
                {value}
            </label>
        </>
    )
}
export default MyLabel