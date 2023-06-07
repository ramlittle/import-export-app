// DEPENDENCIES
import axios from 'axios';
import {useEffect,useState} from 'react'

// COMPONENTS
import Header from '../components/Header'

const AdministrationPage=()=>{
    const [users,setUsers]=useState([]);

    const  fetchData =()=>{
        return axios.get(`http://localhost:8008/api/v1/users`)
            .then((response)=>{
                setUsers(response.data)
            })
            .catch(()=>{
                console.log('data failed to load')
            })
    }

    useEffect(()=>{
        fetchData();
    },[])
    
    console.log('users',users)


    return(
        <>
            <Header/>
            <h2>Users List</h2>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Email</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Is Admin</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                        {
                            users.map(user=>(
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.isAdmin}</td>
                                    <td>
                                        <button>Manage</button>
                                        <button>Delete</button>
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