import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
export function CheckAuth(isAdmin){
    const navigate=useNavigate();
    console.log('you sent',isAdmin)
    if(isAdmin=='false'){
        useEffect(()=>{
            navigate('/NoPermission')
        })
    }
}