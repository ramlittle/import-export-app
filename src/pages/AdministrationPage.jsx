// DEPENDENCIES
import axios from 'axios';
import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

// COMPONENTS
import Header from '../components/Header'

const AdministrationPage=()=>{
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState('');
    const [count,setCount]=useState(0);
    const [message,setMessage]=useState('')
    const [checked,setChecked]=useState([]);

    // FUNCTIONS

    //fetchData
    const fetchData =()=>{
        let url=`http://localhost:8008/api/v1/users`;
        if(search!=''){
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
            .catch((error)=>{
                setMessage(error.response.data.status)
            })
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

    //selectAll
    const onHandleSelectAll=(e)=>{
        if(e.target.checked==false){
            const allUsers=users.map(user=>{
                return user._id
            })
            setChecked(allUsers)
            console.log('checked',checked)
            setMessage(`WARNING: You have selected all ${checked.length} records!`)
        }else{
            setChecked([])
            console.log('checked',checked)
            setMessage(` You have selected ${checked.length} records`)
        }
        
    }

    useEffect(()=>{
        fetchData();
    },[search])

    
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
                        <td>
                            <input type='checkbox'
                                checked={checked.length===users.length}
                                onChange={onHandleSelectAll}
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
                                        onChange={(()=>onCheckBoxHandler(users,user._id,user.select))}
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