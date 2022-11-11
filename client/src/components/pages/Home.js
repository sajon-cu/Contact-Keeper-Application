import React, { useContext, useEffect } from 'react'
import Contacts from '../../components/contacts/Contacts';
import ContactForm from '../../components/contacts/ContactForm';
import FilteredContactForm from '../../components/contacts/FilteredContactForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    
    useEffect(() => {
        authContext.loadUser();
        // eslist-disable-next-line
    }, []); 

    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <FilteredContactForm />
                <Contacts />
            </div>
        </div>
    )
}

export default Home;