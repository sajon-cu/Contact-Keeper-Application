import React, {useContext} from 'react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
const ContactItem = ({contact}) => {

    // Initialize context
    const contactContext = useContext(ContactContext);

    // Destructure method from ContactContext
    const {deleteContact} = contactContext;

    // Destructering Contact Object properties
    const {id, name, email, phone, type} = contact;

    // Delete contact
    const onDelete = e => {
        e.preventDefault();
        deleteContact(id);
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name} <span style={{float: 'right'}} className={'badge '+ (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (<li>
                    <i className='fa fa-envelope-open'></i> {email}
                </li>
                )}
                {phone && (<li>
                    <i className='fa fa-phone'></i> {phone}
                </li>
                )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm'>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem
