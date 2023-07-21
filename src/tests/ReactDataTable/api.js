
import axios from 'axios';

export function fetchData(){
    let url=`http://localhost:8008/api/v1/users`;
    return axios.get(url)
    .then((response)=>{
        // setUsers(response.data)
        // setCount(response.data.length)
        return response
    })
    .catch(()=>{
        console.log('sorry unable to retrieve data')
    })
}