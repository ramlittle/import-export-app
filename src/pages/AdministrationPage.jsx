// DEPENDENCIES
import axios from 'axios';
import {useEffect,useState} from 'react'

// COMPONENTS
import Header from '../components/Header'

const AdministrationPage=()=>{
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState('');
    const [count,setCount]=useState(0);

    const  fetchData =()=>{
        if(search!=''){
            return axios.get(`http://localhost:8008/api/v1/users/search/${search}`)
            .then((response)=>{
                setUsers(response.data)
                setCount(response.data.length)
            })
            .catch(()=>{
                console.log('data failed to load on search')
            })
        }
        return axios.get(`http://localhost:8008/api/v1/users`)
            .then((response)=>{
                setUsers(response.data)
                setCount(response.data.length)
            })
            .catch(()=>{
                console.log('data failed to load')
            })
    }

    useEffect(()=>{
        fetchData();
    },[search])

    return(
        <>
            <Header/>
            <h2>Users List</h2>
            <label>Search: </label>
            <input type='text'
                placeholder='enter family name'
                onChange = {(e)=>setSearch(e.target.value)}
            />
            <span> showing {count} results</span>
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