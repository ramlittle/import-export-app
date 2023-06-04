// DEPENDENCIES
import {useNavigate} from 'react-router-dom'

//CSS
import '../css/App.css'
const LogOut=()=>{
    const navigate=useNavigate();

    function onLogOut(){
        let confirmation =window.confirm('This will Log you Out of the System')

        if(confirmation){
            localStorage.removeItem('userId')
            localStorage.removeItem('userEmail')
            localStorage.removeItem('userIsAdmin')
            localStorage.removeItem('userFirstName')
            localStorage.removeItem('userLastName')
            localStorage.removeItem('userBirthDate')
            navigate('/LoginPage')
        }
    }
    return(
        <>
            <button className='log-out-button'type='button' onClick={onLogOut}>Log Out</button>
        </>
    )
}

export default LogOut;