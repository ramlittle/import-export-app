//DEPENDENCIES
import {Link,useNavigate} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import axios from 'axios';

const RegisterPage=()=>{
    const navigate=useNavigate();

    // STATES
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

    //register user
    const registerUser=(e)=>{
        e.preventDefault();

        if(password!=confirmPassword){
            setErrorMessage('Passwords Entered Do Not Match')
        }else{
            const configuration = {
                method: 'post',
                url: 'http://localhost:8008/api/v1/auth/register',
                data: {
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
        <>
            <h2>Register An Account</h2>
            <form onSubmit={(e)=>registerUser(e)}>
                <label htmlFor='firstName'>First Name</label>
                <input type = 'text' name ='firstName'
                    placeholder='given name'
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    required
                />

                <label htmlFor='lastName'>Last Name</label>
                <input type = 'text' name ='lastName'
                    placeholder='family name'
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    required
                />

                <label htmlFor='birthDate'>Birth Date</label>
                <input type='date' name='birthDate'
                    value={birthDate}
                    onChange={(e)=>setBirthDate(e.target.value)}
                    required
                />

                <label htmlFor='email'>Email: </label>
                <input type='email' name='email'
                    placeholder='sample@email.com' 
                    value={email}
                    onChange={(e)=>setEmail((e.target.value).toLowerCase())}
                    required
                />

                <label htmlFor='password'>Password</label>
                <input type={showPassword} name='password'
                    placeholder='enter password'
                    value={password}
                    onChange={(e)=>setPassword((e.target.value))}
                    required
                />

                <label htmlFor='confirmPassword'>Confirm Password: </label>
                <input type = {showPassword} name='confirmPassword'
                    placeholder='enter password'
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword((e.target.value))}
                    required
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