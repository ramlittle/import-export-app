const LoginPage=()=>{
    return(
        <>
            <h2>Login</h2>
            <form>
                <label htmlFor = 'email'>Email</label>
                <input type='email' name='email'/>
                <label htmlFor ='password'>Password</label>
                <input type='password' name='password'/>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default LoginPage;