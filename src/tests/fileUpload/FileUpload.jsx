import {useState} from 'react'

const FileUpload=()=>{
    const [image,setImage]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log('selected image',image)

        //Call API here to store selected image to server and record data to mongodb
    }
    return(
        <>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label>Image</label>
                <input type='file' 
                    onChange={(e)=>setImage(e.target.files[0])}
                />
                <button>Submit</button>
            </form>
        </>
    )
}

export default FileUpload