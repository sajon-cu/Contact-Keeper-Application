import React, {useContext, useEffect, useState} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    // Initialize Alert Context
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

        
    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) props.history.push('/');

        if(error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser({...user, [e.target.name] : e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        login(user);
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter your email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className="grid-2">
                    <div>
                        <a href="#">Fogot password ?</a>
                    </div>
                    <div>
                        <p>Don't have account? <a href="/register">Sign Up</a></p>
                    </div>
                </div>
                
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login
