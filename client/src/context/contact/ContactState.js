import React, {useReducer} from 'react'
import {v4 as uuid} from "uuid";
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    ADD_CONTACT,   
    DELETE_CONTACT,
    SET_CURRENT,   
    CLEAR_CURRENT, 
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER , 
    SET_ALERT,     
    REMOVE_ALERT, 
    } from '../types';
    

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Saiful Islam Sajon',
                email: 'saifulislamsajon@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Sohan Khan',
                email: 'sohankhan@gmail.com',
                phone: '111-222-1111',
                type: 'professional'
            },
            {
                id: 3,
                name: 'Shakil Khan',
                email: 'shailkhan@gmail.com',
                phone: '111-333-1111',
                type: 'personal'
            }
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuid();
        dispatch({type: ADD_CONTACT, payload: contact});
    }
    // Delete Contact
    const deleteContact = (id) => {
        dispatch({type: DELETE_CONTACT, payload: id});
    }

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }

    // Update Contact
    const updateContact = (contact) => {
        dispatch({type: UPDATE_CONTACT, payload: contact});
    }

    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({type: FILTER_CONTACT, payload: text});
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    }











    console.log("Contact State Rendered")
    
    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
