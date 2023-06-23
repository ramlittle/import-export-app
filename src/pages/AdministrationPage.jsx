// DEPENDENCIES
import axios from 'axios';
import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

// COMPONENTS
import Header from '../components/Header'

//PAGES
import RegisterPage from './RegisterPage.jsx';
const AdministrationPage=()=>{

    //Initial variables
    const loggedInUser=localStorage.getItem('userId')

    // STATES
    const [openModal,setOpenModal]=useState(false);
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState('');
    const [count,setCount]=useState(0);
    const [message,setMessage]=useState('')
    const [checked,setChecked]=useState([]);

    // FUNCTIONS

    //fetchData API
    const fetchData =()=>{
        let url=`http://localhost:8008/api/v1/users`;
        if(search!=''){
            //below is what you call server side filtering, it uses email as reference
            url=`http://localhost:8008/api/v1/users/search/${search}`
        }

        return axios.get(url)
            .then((response)=>{
                // let users=response.data.map((user)=>{
                // return {select:false,...user}
                // }) sample code to add a new field without actually adding it to the models
                setUsers(response.data)
                setCount(response.data.length)
            })
            .catch(()=>{
                setMessage('sorry unable to retrieve data')
            })
    }

    //delete single record API
    const onSingleDeleteHandler=(userId)=>{
        const confirmBox=window.confirm(`WARNING: This will delete this record ${userId}`);

        if(confirmBox){
            if(loggedInUser!=userId){
                return axios.delete(`http://localhost:8008/api/v1/users/${userId}`)
                .then((response)=>{
                    setMessage(` ${response.data.status} with ID ${userId}`)  
                    fetchData();
                })
                .catch(()=>{
                    setMessage('sorry unable to delete user')
                })
            }else{
                setMessage('You are the admin logged In, unable to delete')
                alert(message);
            }
        }
        
    }

    //delete multiple records API
    const onMultipleDeleteHandler=()=>{
        
        //check if user selected the logged in user to be deleted
        const checkLoggedIn=checked.filter(check=>{
            if(check == loggedInUser){
                setMessage(' You have selected your own log in to be deleted, please remove it from the selection')
                return check
            }
        })

        //stops user from deleting own account
        if(checkLoggedIn==loggedInUser){
            return alert('You have selected your own log in to be deleted, please remove it from the selection')
        }
        
        //at one record should be selected
        if(checked.length<1){
            setMessage(' Select at least one record')
            return alert('Select at least one record')
        }
        
        //if all is well, execute below code
        const confirmBox=window.confirm(`WARNING: This will delete ${checked.legnth} records`)

        if(confirmBox){
            return axios.post(`http://localhost:8008/api/v1/users/delete/many`,checked)
                .then((result)=>{
                    console.log('you have selected to delete', checked)
                    setChecked([])//clear check count
                    setMessage(result.data.status)
                    fetchData();//refresh data list
                })
                .catch((error)=>{
                    console.log('unable to delete, check logs')
                })    
        }
    }

    //selectAll
    // reference: https://fontawesomeicons.com/tryit/code/react-js-checkbox-select-all-unselect-all/0
    const onSelectAllHandler = (e) => {
          if (e.target.checked) {
            const allUsers = users.map((user) => user._id);
            setChecked(allUsers);
          } else {
            setChecked([]);
          }
          setMessage(`WARNING: You have selected all ${checked.length} users`)
        };

    // select some
    const onSelectSomeHandler = (e, user) => {
        if (e.target.checked) {
        setChecked([...checked, user._id]);
        } else {
        setChecked(checked.filter((item) => item !== user._id));
        }
    };

    //Render Fetch Data on first load and change in search state
    useEffect(()=>{
        fetchData();
    },[search])
    
    //render log of selected records 
    useEffect(()=>{
        setMessage(` You have selected ${checked.length} users`)
    },[checked])

    return(
        <>
            <Header/>
            <h2>Users List</h2>
            {/* <p>{checked.join(", ")}</p> */}
            {/* <Link to='/RegisterPage'>Add New</Link> */}
            <button onClick={()=>setOpenModal(true)}>Add New User</button>
            <RegisterPage 
                openModal={openModal}
                onClose={()=>setOpenModal(false)}
            />
            <div>
                <label>Search: </label>
                <input type='text'
                    placeholder='enter family name'
                    onChange = {(e)=>setSearch(e.target.value)}
                />
                <span> showing {count} results</span>
            </div>
            <div>
                <button onClick={onMultipleDeleteHandler}>DELETE</button>
            </div>
            <p>LOG HISTORY:{message}</p>

            <table>
                <thead>
                    <tr>
                        <td>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={checked.length === users.length}
                            onChange={onSelectAllHandler}
                            />
                        </td>
                        <td>ID</td>
                        <td>Email</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>User Level</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user=>(
                            <tr key={user._id}>
                                <td>
                                    <input type ='checkbox'
                                        id={user._id}
                                        checked={checked.includes(user._id)}
                                        onChange={((e)=>onSelectSomeHandler(e,user))}
                                    />
                                </td>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                {
                                    user.isAdmin?
                                    (<td>Administrator</td>):(<td>Standard User</td>)
                                }
                                <td>
                                    {/* user is the prop to be passed to ManageUserPage */}
                                    <Link to='/ManageUserPage' state={{user}}>Manage</Link>
                                    <button onClick={()=>onSingleDeleteHandler(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default AdministrationPage;