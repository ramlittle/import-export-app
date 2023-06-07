//DEPENDENCIES
import {useState,useEffect} from 'react';
import axios from 'axios';

// COMPONENETS
import Header from '../components/Header'
const SettingsPage =()=>{
    //OBTAINED LOCAL STORAGE DATA
    const UserId = localStorage.getItem('userId')

    //STATES
    const [email,setEmail]=useState('');
    const [isAdmin,setIsAdmin]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [birthDate,setBirthDate]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState('password');
    const [userMessage,setUserMessage]=useState('');
    const [passwordMessage,setPasswordMessage]=useState('');

    //OBTAIN USER DATA BASED ON ID LOCAL STORAGE
    const initialLoad=()=>{
            useEffect(()=>{
            axios.get(`http://localhost:8008/api/v1/users/${UserId}`)
            .then(res=>{
                setEmail(res.data.email)
                setIsAdmin(res.data.isAdmin)
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setBirthDate(res.data.birthDate.split('T')[0])
            })
            .catch(err =>{
                setUserMessage('Unable to Obtain User Information, err')
            })
        },[])
    }
    // FUNCTIONS 

    //show password
    const onShowPassword=(e)=>{
        if(e.target.checked){
            setShowPassword('text');
        }else{
            setShowPassword('password');
        }
    }

    //update user information
    const updateUserInformation=(e)=>{
        e.preventDefault();
        const configuration = {
            method: "put",
            url: `http://localhost:8008/api/v1/users/${UserId}`,
            data: {
              firstName,
              lastName,
              birthDate
            },
          };
      
          // make the API call
          axios(configuration)
            .then((result) => {
                setUserMessage(result.data.status)
            })
            .catch((error) => {
                setUserMessage(error.response.data.status);
            });
    }

    //update password
    const updatePassword=(e)=>{
        e.preventDefault();
        const configuration = {
            method: "put",
            url: `http://localhost:8008/api/v1/users/password/${UserId}`,
            data: {
              password
            },
          };
      
          // make the API call
          axios(configuration)
            .then((result) => {
                setPasswordMessage(result.data.status)
            })
            .catch((error) => {
                setPasswordMessage(error.response.data.status);
            });
    }

    //RUN INITIAL FUNCTIONS
    initialLoad();
    
    return(
        <>
            <Header/>
            <h2>Settings</h2>
            <div className='form-group'>
                <label>User ID</label>
                <label>{UserId}</label>
            </div>

            <div className='form-group'>
                <label>Email</label>
                <label>{email}</label>
            </div>

            <div className='form-group'>
                <label>User Level</label>
                {
                    !isAdmin? 
                    (<label>Standard User</label>):(<label>Administrator</label>)
                }
            </div>

            <form onSubmit={(e)=>updateUserInformation(e)}>
                <fieldset>
                    <legend>Personal Information</legend>

                        <div className='form-group'>
                            <label htmlFor='firstName'>First Name</label>
                            <input type = 'text' name ='firstName'
                                placeholder='given name'
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input type = 'text' name ='lastName'
                                placeholder='family name'
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='birthDate'>Birth Date</label>
                            <input type='date' name='birthDate'
                                value={birthDate}
                                onChange={(e)=>setBirthDate(e.target.value)}
                            />
                        </div>

                </fieldset>
                <div className='form-button'>
                        <button type='submit'>Update User Information</button>
                        {
                            userMessage =='User Information has been updated Successfully'? 
                            (<span style={{color:'green'}}>{userMessage}</span> ):(<span>{userMessage}</span>)
                        }
                </div>
            </form>

            <form onSubmit={(e)=>updatePassword(e)}>
                <fieldset>
                    <legend>Security</legend>
                        <div className='form-group'>
                            <label htmlFor='password'>New Password</label>
                            <input type={showPassword} name='password'
                                placeholder='enter password'
                                value={password}
                                onChange={(e)=>setPassword((e.target.value))}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='showPassword'>Show Password</label>
                            <input type='checkbox' name = 'showPassword'
                                onChange={onShowPassword}
                            />
                        </div>
                </fieldset>
                <div className='form-button'>
                        <button type='submit'>Update Password</button>
                        {
                            passwordMessage =='Password Update is successful!'? 
                            (<span style={{color:'green'}}>{passwordMessage}</span> ):(<span>{passwordMessage}</span>)
                        }
                </div>
            </form>   
        </>
    )
}

export default SettingsPage;