const MyInput=({placeholder,type,name,value,onChange,onClick})=>{
    return(
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onClick={onClick}
                className='p-5 bg-green-500'
            />
        </>
    )
}
export default MyInput