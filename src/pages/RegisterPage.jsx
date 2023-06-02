import {Link} from 'react-router-dom';
const RegisterPage=()=>{
    return(
        <>
            <h2>Register An Account</h2>
            <form>
                <label htmlFor='email'>Email: </label>
                <input type='email' name='email'/>

                <label htmlFor='password'>Password</label>
                <input type='password' name='password'/>

                <label htmlFor='re-enter-password'>Re-enter Password: </label>
                <input type = 'password' name='re-enter-password'/>

                <button type='submit'>Submit</button>
                <Link to ='/LoginPage'>Cancel</Link>
            </form>
        </>
    )
}
export default RegisterPage;