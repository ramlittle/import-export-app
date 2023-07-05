import { useState } from 'react'
import axios from 'axios';
const FileUpload = () => {
    const [image, setImage] = useState('')
    const [firstName, setFirstName ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('selected image', image)

        const configuration = {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
              },
            url: 'http://localhost:8008/api/v1/image/upload',
            data: {
                file: image,
                firstName:firstName
            },
        };

        // make the API call
        axios(configuration)
            //you can a .then here
            .catch((error) => {
                alert(error.response.data.status);
            });
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
                <label>Image</label>
                <input type='file' name='image'
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label>first name</label>
                <input type='text' name='firstName'
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </>
    )
}

export default FileUpload