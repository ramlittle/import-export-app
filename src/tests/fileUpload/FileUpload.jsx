import { useState } from 'react'
import axios from 'axios';
const FileUpload = () => {
    const [image, setImage] = useState('')

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
            },
        };

        // make the API call
        axios(configuration)
            // .then((result) => {
            //   if(result.data.status=='User already exists'){
            //     setErrorMessage('User already exists');
            //   }else{
            //     alert(result.data.status);
            //     navigate('/LoginPage');
            //   }

            // })
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
                <button>Submit</button>
            </form>
        </>
    )
}

export default FileUpload