// DEPENDENCIES
import axios from 'axios';
import {useEffect,useState} from 'react'

const GlobalSearchSample=()=>{
    // STATES
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState();
    const [count,setCount]=useState(0);
    const [filteredUsers, setFilteredUsers]=useState([]);

    // API
    const fetchData=()=>{
        let url=`http://localhost:8008/api/v1/users`;
        return axios.get(url)
            .then(response=>{
                setUsers(response.data)
                setFilteredUsers(response.data)
                setCount(response.data.length)
            })
            .catch((error)=>{
                setMessage('sorry failed to load users')
            })
    }
   
    // FUNCTIONS
    const handleSearch=()=>{
        // single column filter search by email, but if you add more columns to filter,
        //  you will achieve global search
        // at the moment you have filtering for two columns, ID and email
        console.log('you entered',search)
        const newList=users.filter(user=>{
            if(user.email.toLowerCase().includes(search)){
                return user;
            }
            if(user._id.toLowerCase().includes(search)){
                return user
            }
        })
        console.log('new list',newList)
        setFilteredUsers(newList)
        setCount(newList.length)
    }

    // EFFECTS
    useEffect(()=>{
        fetchData();
    },[])

    console.log('filtered users initial',filteredUsers)
    useEffect(()=>{
        handleSearch();
    },[search])
    
    return(
        <>
            <input type='search' onChange={(e)=>setSearch(e.target.value)}/>
            <h6>below count {count}</h6>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>firstName</td>
                        <td>lastName</td>
                        <td>sex</td>
                        <td>birthdate</td>
                        <td>email</td>
                        <td>password</td>
                        <td>contactNumber</td>
                        <td>address</td>
                        <td>isAdmin</td>
                        <td>picture</td>
                    </tr>
                </thead>
                <tbody>
                    
                {
                    filteredUsers.map(user=>(
                        
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.sex}</td>
                            <td>{user.birthdate}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.contactNumber}</td>
                            <td>{user.address}</td>
                            <td>{user.isAdmin}</td>
                            <td>{user.picture}</td>
                        </tr>
                    ))
                }
            
                </tbody>
            </table>
        </>
    )
}

export default GlobalSearchSample;