import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { LOGOUT } from '../../context/types';

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    }
    
    const authLinks = (
        <Fragment>
            <li>
                <a onClick={ onLogout } href='#!'>
                    <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon}/> 
                 &nbsp; {title}
            </h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </nav>
    )
}


Navbar.defaultProps = {
    title:"ContactKeeper",
    icon: "fa fa-contact"
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar;