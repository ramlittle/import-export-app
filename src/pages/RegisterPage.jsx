//DEPENDENCIES
import {Link,useNavigate} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import axios from 'axios';

const RegisterPage=()=>{
    const navigate=useNavigate();

    // STATES
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

    //register user
    const registerUser=(e)=>{
        e.preventDefault();

        if(!!!email || !!!password || !!!confirmPassword){
            setErrorMessage('Please complete the form')
        }else if(password!=confirmPassword){
            setErrorMessage('Passwords Entered Do Not Match')
        }else{
            const configuration = {
                method: 'post',
                url: 'http://localhost:8008/api/v1/auth/register',
                data: {
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
        <>
            <h2>Register An Account</h2>
            <form onSubmit={(e)=>registerUser(e)}>
                <label htmlFor='email'>Email: </label>
                <input type='email' name='email'
                    placeholder='sample@email.com'
                    value={email}
                    onChange={(e)=>setEmail((e.target.value).toLowerCase())}
                />

                <label htmlFor='password'>Password</label>
                <input type={showPassword} name='password'
                    placeholder='enter password'
                    value={password}
                    onChange={(e)=>setPassword((e.target.value))}
                />

                <label htmlFor='confirmPassword'>Confirm Password: </label>
                <input type = {showPassword} name='confirmPassword'
                    placeholder='enter password'
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword((e.target.value))}
                />

                <label htmlFor='showPassword'>Show Password</label>
                <input type='checkbox' name = 'showPassword'
                    onChange={onShowPassword}
                />

                <button type='submit'>Submit</button>
                <Link to ='/LoginPage'>Cancel</Link>
                <span> {errorMessage}</span>
            </form>
        </>
    )
}
export default RegisterPage;