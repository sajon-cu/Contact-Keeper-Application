import React, {useReducer} from 'react'
import {v4 as uuid} from "uuid";
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    
    } from '../types';
    

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load User

    // Register User

    // Login User

    // Logout

    // Clear Errors

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
