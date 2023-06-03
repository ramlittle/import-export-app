//DEPENDENCIES
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react';
//COMPONENTS
import Header from '../components/Header'

const HomePage=()=>{
    const navigate=useNavigate();
    const userId=localStorage.getItem('userId')

    //ON PAGE LOAD EVENT

    //redirect user if not yet loggedIn
    if(!!!userId){
        //why have useEffect? best to let initial render finish, before calling this
        useEffect(()=>{
            navigate('/LoginPage')
        })   
    }

    return(
        <>
            <Header/>
            <h2>Home</h2>
            <p>I am the Home Page</p>
        </>
    )
}
export default HomePage;