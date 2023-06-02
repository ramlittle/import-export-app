import {Link} from 'react-router-dom'
const LoginPage=()=>{
    return(
        <>
            <h2>Login</h2>
            <div>
                <form>
                    <label htmlFor = 'email'>Email</label>
                    <input type='email' name='email'/>
                    <label htmlFor ='password'>Password</label>
                    <input type='password' name='password'/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div>
                <p>Don't have an account?</p>
                <Link to ='/RegisterPage'>Register</Link>
            </div>
            
            
        </>
    )
}

export default LoginPage;