//DEPENDENCIES
import {useNavigate} from 'react-router-dom'
//COMPONENTS
import Header from '../components/Header'

const HomePage=()=>{
    const navigate=useNavigate();
    const userID=localStorage.getItem('userId')
    const userEmail=localStorage.getItem('userEmail');

    //ON PAGE LOAD EVENT

    //check if user is loggedIn
    if(!!!userID){
        navigate('/LoginPage')
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