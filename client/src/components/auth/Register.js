import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {


    // Initialize Alert Context
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    // Initialize Alert Context
    const authContext = useContext(AuthContext);
    const { registerUser, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if(error === 'User already exists!') {
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslist-disable-next-line
    }, [error, isAuthenticated, props.history]);

    // Component label state
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = user;

    const onChange = e => setUser({...user, [e.target.name] : e.target.value})
    
    // Regerter Method
    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password ==='') {
            setAlert('Please Enter all the fields', 'danger');
        } else if(password != password2) {
            setAlert('Password do not match', 'danger');
        } else {
            registerUser({
                name, email, password
            })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter your name" name="name" value={name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter your email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" name="password2" value={password2} onChange={onChange}/>
                </div>
                <p>Already have an account? <a href="/login">Sign In</a></p>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register
