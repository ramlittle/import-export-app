//DEPENDENCIES
import { Link } from "react-router-dom"

// COMPONENTS
import Logout from './Logout'

const Header=()=>{
    const UserEmail = localStorage.getItem('userEmail')
    return(
        <>
            <header>
                <div>
                    <h1>Logo</h1>
                </div>
                <div>
                    <Link to ='/'>Home</Link>
                    <Link to ='/AboutPage'>About</Link>
                </div>
                <div>
                    <p>Welcome, {UserEmail}</p>
                    <Logout/>
                </div>
            </header>
        </>
    )
}
export default Header;