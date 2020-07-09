import React, {useReducer} from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    DD_CONTACT,   
    DELETE_CONTACT,
    SET_CURRENT,   
    CLEAR_CURRENT, 
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER , 
    SET_ALERT,     
    REMOVE_ALERT } from '../types'
    

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
        ]
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact

    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear Filter













    
    return (
        <ContactContext.Provider value={{
            contacts: state.contacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
