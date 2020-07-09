import React, {Fragment} from 'react'
import Contacts from '../../components/contacts/Contacts';
import ContactForm from '../../components/contacts/ContactForm';
import FilteredContactForm from '../../components/contacts/FilteredContactForm';
const Home = () => {
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