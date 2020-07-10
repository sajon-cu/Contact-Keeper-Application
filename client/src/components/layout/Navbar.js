import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = ({title, icon}) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon}/> 
                 &nbsp; {title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>    
                    <Link to='/about'>About</Link>
                </li>
                <li>    
                    <Link to='/login'>Login</Link>
                </li>
                <li>    
                    <Link to='/register'>Register</Link>
                </li>
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