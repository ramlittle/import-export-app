// DEPENDENCIES
import axios from 'axios';
import {useEffect,useState} from 'react'

// component
import Pagination from './Pagination'

const GlobalSearchSample=()=>{
    // STATES
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState();
    const [count,setCount]=useState(0);
    const [filteredUsers, setFilteredUsers]=useState([]);
    const [message,setMessage]=useState('');
    // pagination states
    const[currentPage,setCurrentPage] = useState(1)//initial page
    const[recordsPerPage]=useState(3);
    
    //pagination variables
    const indexOfLastRecord=currentPage * recordsPerPage;
    const indexOfFirstRecord=indexOfLastRecord-recordsPerPage;
    const currentRecords=users.slice(indexOfFirstRecord,indexOfLastRecord)
    const nPages=Math.ceil(users.length/recordsPerPage)


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
            { 
                count<1 ? 
                (<h6>{count} results found </h6>):(<h6>showing {count} users</h6>)
            }
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <table className='bg-green-500'>
                <thead>
                    <tr className='border border-red-50'>
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
                    currentRecords.slice(0).reverse().map(user=>(
                        
                        <tr key={user._id}
                            className='border border-red-500 hover:bg-yellow-500'
                        >
                            
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