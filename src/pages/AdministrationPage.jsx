// DEPENDENCIES
import axios from 'axios';
import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

// COMPONENTS
import Header from '../components/Header'

const AdministrationPage=()=>{
    //VARIABLES
    let displayUsers=[];

    // STATES
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState('');
    const [count,setCount]=useState(0);
    const [message,setMessage]=useState('')
    const [selected,setSelected]=useState(0);

    
    // FUNCTIONS

    //fetchData
    const fetchData =()=>{
        return axios.get(`http://localhost:8008/api/v1/users`)
            .then((response)=>{
                setUsers(response.data)
                setCount(response.data.length)
            })
            .catch((error)=>{
                setMessage(error.response.data.status)
            })
    }

    //display of data
    function displayData(){
        if(search!=''){
           console.log('you searched')
        //    LOG: still working on search and multiple check box feature
        // you are stuck here, dapat sa tuwing may search, ung selected value ay updated din, hindi laging false
        }else{
            let newList=users.map(user=>{
                return{selected:false,...user}
            })
            console.log('displayUsers',newList)
            return displayUsers=newList
        }
    }

    //delete single record
    const onDeleteHandler=(userId)=>{
        const confirmBox=window.confirm(`WARNING: This will delete this record ${userId}`);
        const loggedInUser=localStorage.getItem('userId');
        if(confirmBox){
            if(loggedInUser!=userId){
                return axios.delete(`http://localhost:8008/api/v1/users/${userId}`)
                .then((response)=>{
                    setMessage(` ${response.data.status} with ID ${userId}`)
                    fetchData();
                })
                .catch(()=>{
                    setMessage(error.response.data.status)
                })
            }else{
                setMessage('You are the admin logged In, unable to delete')
                alert(message);
            }
        }
        
    }

    //multiple select, this will update the list where records are selected
    const onCheckBoxHandler=(users,userId,userSelect)=>{
        console.log('all users',users)
        console.log('userId Selected',userId)
        console.log('boolean', userSelect)
        
        let selectedUserIds=users.map((user)=>{
            if(user._id==userId){
                if(user.select==false){
                    user.select=true;
                }else{
                    user.select=false;
                }
            }
            return user;
        })
        
        setUsers(selectedUserIds)

        console.log('selected user Id',users)

        // search has bug, this part function has bug, looks like I won't need API for the search
    }

    useEffect(()=>{
        fetchData();
    },[])
    console.log('fetched users',users)

    displayData();
        
    return(
        <>
            <Header/>
            <h2>Users List</h2>
            <Link to='/RegisterPage'>Add New</Link>
            <label>Search: </label>
            <input type='text'
                placeholder='enter family name'
                onChange = {(e)=>setSearch(e.target.value)}
            />
            <span> showing {count} results</span>
            <span>{message}</span>
            <table>
                <thead>
                    <tr>
                        <td><input type ='checkbox'/></td>
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
                        displayUsers.map(user=>(
                            <tr key={user._id}>
                                <td>
                                    <input type ='checkbox'
                                        onChange={(()=>onCheckBoxHandler(displayUsers,user._id,user.select))}
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
                                    <button onClick={()=>onDeleteHandler(user._id)}>Delete</button>
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