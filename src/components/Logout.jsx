// DEPENDENCIES
import {useNavigate} from 'react-router-dom'

const LogOut=()=>{
    const navigate=useNavigate();

    function onLogOut(){
        let confirmation =window.confirm('This will Log you Out of the System')

        if(confirmation){
            localStorage.removeItem('userId')
            localStorage.removeItem('userEmail')
            navigate('/LoginPage')
        }
    }
    return(
        <>
            <button type='button' onClick={onLogOut}>Log Out</button>
        </>
    )
}

export default LogOut;