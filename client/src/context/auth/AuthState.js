import React, {useReducer} from 'react'
import {v4 as uuid} from "uuid";
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';

import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS } from '../types';
    

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
    const loadUser = () => { console.log('Load user') }

    // Register User
    const registerUser = async (formData) => {
        const config = {
            headers: {
                'Context-type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
        } catch (error) {
            dispatch({type: REGISTER_FAIL, payload: error.response.data.msg});
        }

    }
    // Login User
    const loginUser = () => { console.log('User login') }

    // Logout
    const logout = () => { console.log('Logout') }

    // Clear Errors
    const clearErrors = () => { dispatch({ type: CLEAR_ERRORS })}

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error,
            registerUser,
            loginUser,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
