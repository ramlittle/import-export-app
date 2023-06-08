//DEPENDENCIES
import { Link } from "react-router-dom"

// COMPONENTS
import Logout from './Logout'

const Header=()=>{
    const UserEmail = localStorage.getItem('userEmail')
    const UserIsAdmin = localStorage.getItem('userIsAdmin')
    const UserFirstName = localStorage.getItem('userFirstName')
    return(
        <>
            <header>
                <div>
                    <h1>Logo</h1>
                </div>
                <div>
                    <Link className='menu-link' to ='/'>Home</Link>
                    <Link className='menu-link' to ='/AboutPage'>About</Link>
                    {
                        // This Link only appears if User is admin
                        UserIsAdmin=='true' ? 
                        (<Link className='menu-link' to ='/AdministrationPage'>Administration</Link>):
                        (null)
                    }
                </div>
                <div>
                    <p>Welcome {UserFirstName}, {UserEmail}</p>
                    <Link className ='setting-link'to ='/SettingsPage'>Settings</Link>
                    <Logout/>
                </div>
            </header>
        </>
    )
}
export default Header;