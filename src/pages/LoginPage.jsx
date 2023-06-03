// DEPENDECIS
import {Link,useNavigate} from 'react-router-dom'
import{useEffect, useState} from 'react'
import axios from 'axios'

const LoginPage=()=>{
    const navigate=useNavigate();

    // STATES
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState('password')
    const [errorMessage,setErrorMessage]=useState();

    // ONPAGE LOAD EVENT

    //redirect to home page if already logged in
    const userId=localStorage.getItem('userId');
    if(userId){
        useEffect(()=>{
            navigate('/')
        })
    }

    // FUNCTIONS

    //show password
    const onShowPassword=(e)=>{
        if(e.target.checked){
            setShowPassword('text')
        }else{
            setShowPassword('password')
        }
    }

    //login user
    const login = (e)=>{
        e.preventDefault();

        if(!!!email || !!!password){
            setErrorMessage('Fields must be complete!')
        }else{
        const configuration={
            method: 'post',
            url: 'http://localhost:8008/api/v1/auth/login',
            data:{
                email,
                password
            }
        }
        axios(configuration)
        .then((result)=>{
                //check if the login is valid
                if(result.data.status=='Email not yet registered'){
                    setErrorMessage('Email not yet registered')
                }else if(result.data.status=='Invalid password'){
                    setErrorMessage('Invalid password')
                }else{
                    /*why did I capture per item the user details?
                    it's because if you are going to console log, the data below, it is a string, not an array*/
                    setErrorMessage('Access Granted')
                    localStorage.setItem('userId',result.data.id);
                    localStorage.setItem('userEmail',result.data.email)
                    localStorage.setItem('userIsAdmin',result.data.isAdmin)
                    localStorage.setItem('userFirstName',result.data.firstName)
                    localStorage.setItem('userLastName',result.data.lastName)
                    localStorage.setItem('userBirthDate',result.data.birthDate)
                    navigate('/')
                }
            })
        }
    }

    return(
        <>
            <h2>Login</h2>
            <div>
                <form onSubmit={(e)=>login(e)}>
                    <label htmlFor = 'email'>Email</label>
                    <input type='email' name='email'
                        placeholder='example@email.com'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <label htmlFor ='password'>Password</label>
                    <input type={showPassword} name='password'
                        placeholder='your password here'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <label htmlFor='showPassword'>Show Password</label>
                    <input type='checkbox' name='showPassword'
                        onChange={onShowPassword}
                    />

                    <button type='submit'>Submit</button>
                    <span>{errorMessage}</span>
                </form>
            </div>
            <div>
                <p>Don't have an account?</p>
                <Link to ='/RegisterPage'>Register</Link>
            </div>
            
            
        </>
    )
}

export default LoginPage;