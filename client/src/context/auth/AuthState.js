import React, {useReducer} from 'react'
import {v4 as uuid} from "uuid";
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT
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
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            console.log('res: ', res);
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch(err) {
            dispatch({ type: AUTH_ERROR })
        }
    }

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

            loadUser();
        } catch (error) {
            dispatch({type: REGISTER_FAIL, payload: error.response.data.msg});
        }

    }

    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Context-type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });

            loadUser();
        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
        }
    }

    // Logout
    const logout = () => { dispatch({ type: LOGOUT }) }

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
            login,
            loadUser,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
