//DEPENDENCIES
import {Link,useNavigate} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import axios from 'axios';

const RegisterPage=({openModal,onClose})=>{
    // openModal is a boolean
    //onClose is a function passed by Admin Page
    // if(!openModal){
    //     return null
    // }

    const navigate=useNavigate();

    // STATES
    const [picture,setPicture]=useState('')
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [birthDate,setBirthDate]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [showPassword,setShowPassword]=useState('password');
    const [errorMessage,setErrorMessage]=useState();

    //FUNCTIONS
    
    //show password
    const onShowPassword=(e)=>{
        if(e.target.checked){
            setShowPassword('text');
        }else{
            setShowPassword('password');
        }
    }

    //handle image
    function handlePicture(e){
        console.log(e.target.files)
        setPicture(e.target.files[0])
    }
    //register user
    const registerUser=(e)=>{
        e.preventDefault();
        console.log('dito data',picture, firstName)
        if(password!=confirmPassword){
            setErrorMessage('Passwords Entered Do Not Match')
        }else{
            const configuration = {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                  },
                url: 'http://localhost:8008/api/v1/auth/register',
                data: {
                  file:picture,
                  firstName:firstName,
                  lastName:lastName,
                  birthDate:birthDate,
                  email:email,
                  password:password,
                },
              };
            
              // make the API call
              axios(configuration)
                .then((result) => {
                  if(result.data.status=='User already exists'){
                    setErrorMessage('User already exists');
                  }else{
                    alert(result.data.status);
                    navigate('/LoginPage');
                  }
                  
                })
                .catch((error) => {
                  alert(error.response.data.status);
                }); 
        }
    }
    return(
        <section className='registration-body'>
            <section className='registration-section'>
                <p onClick={onClose}>Close</p>
                <h2>Register An Account</h2>
                <form onSubmit={(e)=>registerUser(e)}>
                    <div className='form-group'>
                        <label htmlFor='picture'>Picture</label>
                        <input type='file' name='picture'
                            onChange={handlePicture}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type = 'text' name ='firstName'
                            placeholder='given name'
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type = 'text' name ='lastName'
                            placeholder='family name'
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='birthDate'>Birth Date</label>
                        <input type='date' name='birthDate'
                            value={birthDate}
                            onChange={(e)=>setBirthDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email: </label>
                        <input type='email' name='email'
                            placeholder='sample@email.com' 
                            value={email}
                            onChange={(e)=>setEmail((e.target.value).toLowerCase())}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type={showPassword} name='password'
                            placeholder='enter password'
                            value={password}
                            onChange={(e)=>setPassword((e.target.value))}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='confirmPassword'>Confirm Password: </label>
                        <input type = {showPassword} name='confirmPassword'
                            placeholder='confirm password'
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword((e.target.value))}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='showPassword'>Show Password</label>
                        <input type='checkbox' name = 'showPassword'
                            onChange={onShowPassword}
                        />
                    </div>

                    <div className='form-button'>
                        <button type='submit'>Submit</button>
                        <Link to ='/LoginPage'>Cancel</Link>
                        <span> {errorMessage}</span>
                    </div>
                </form>

            </section>
        </section>
    )
}
export default RegisterPage;