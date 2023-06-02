import { Link } from "react-router-dom"
const Header=()=>{
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
                    <p>Welcome, </p>
                    <button type='button'>Log Out</button>
                </div>
            </header>
        </>
    )
}
export default Header;