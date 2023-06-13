//DEPENDENCIES
import {useState} from 'react'
import {useLocation} from 'react-router'//used when obtaining props from router
import {Link} from 'react-router-dom'
import axios from 'axios';
//COMPONENTS
import Header from '../components/Header'
const ManageUserPage=()=>{
    //Locator for record clicked to be managed/edited
    const location=useLocation();
    const user=location.state.user; //user is the one passed on this component
    console.log('editThisUserDate',user)

    //STATES
    const [firstName,setFirstName]=useState(user.firstName);
    const [lastName,setLastName]=useState(user.lastName);
    const [birthDate,setBirthDate]=useState(user.birthDate.split('T')[0]);
    const [isAdmin,setIsAdmin]=useState(false);
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState('password');
    const [userMessage,setUserMessage]=useState('');
    const [passwordMessage,setPasswordMessage]=useState('');

    // FUNCTIONS
    //show password
    const onShowPassword=(e)=>{
        if(e.target.checked){
            setShowPassword('text');
        }else{
            setShowPassword('password');
        }
    }

    // API FUNCTIONS
    
    //update user information
    const updateUserInformation=(e)=>{
        e.preventDefault();
        const configuration = {
            method: "put",
            url: `http://localhost:8008/api/v1/users/${user._id}`,
            data: {
              firstName,
              lastName,
              birthDate,
              isAdmin
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
            url: `http://localhost:8008/api/v1/users/password/${user._id}`,
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

    return (
        <>
            <Header/>
            <h2>Manage User</h2>
            <div className='form-group'>
                <label>User ID</label>
                <label>{user._id}</label>
            </div>

            <div className='form-group'>
                <label>Email</label>
                <label>{user.email}</label>
            </div>

            <div className='form-group'>
                <label>User Level</label>
                {
                    !user.isAdmin? 
                    (<label>Standard User</label>):(<label>Administrator</label>)
                }
            </div>

            <form onSubmit={(e)=>updateUserInformation(e)}>
                <fieldset>
                    <legend>Personal Information</legend>
                        <div className='form-group'>
                            <label htmlFor='isAdmin'>Set as Administrator</label>
                            <input type='checkbox' name='isAdmin'
                                onChange={(e)=>setIsAdmin(e.target.checked)}
                            />
                        </div>

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
            <Link to ='/AdministrationPage'>Return</Link>
        </>
    )
}
export default ManageUserPage;