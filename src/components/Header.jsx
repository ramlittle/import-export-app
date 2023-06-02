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
                    <Link to ='/LoginPage'>LoginPage</Link>
                </div>
            </header>
        </>
    )
}
export default Header;