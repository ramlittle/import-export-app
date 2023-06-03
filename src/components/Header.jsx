//DEPENDENCIES
import { Link } from "react-router-dom"

// COMPONENTS
import Logout from './Logout'

const Header=()=>{
    const UserEmail = localStorage.getItem('userEmail')
    const UserIsAdmin = localStorage.getItem('userIsAdmin')
    const UserFirstName = localStorage.getItem('userFirstName')
    const UserLastName = localStorage.getItem('userLastName')
    const UserBirthDate = localStorage.getItem('userBirthDate')
    return(
        <>
            <header>
                <div>
                    <h1>Logo</h1>
                </div>
                <div>
                    <Link to ='/'>Home</Link>
                    <Link to ='/AboutPage'>About</Link>
                    {
                        // This Link only appears if User is admin
                        UserIsAdmin=='true' ? 
                        (<Link to ='/AdministrationPage'>Administration</Link>):
                        (null)
                    }
                </div>
                <div>
                    <p>Welcome {UserFirstName} {UserLastName}, {UserEmail}, {UserBirthDate}</p>
                    <Link to ='/SettingsPage'>Settings</Link>
                    <Logout/>
                </div>
            </header>
        </>
    )
}
export default Header;