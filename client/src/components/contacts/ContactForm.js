import React, {useState, useContext} from 'react'
import ContactContext from '../../context/contact/contactContext';
const ContactForm = () => {

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    // Destructering state value
    const {name, email, phone, type} = contact;
    
    // Initialize context
    const contactContext = useContext(ContactContext);

    /*
    * @param Event
    * @desc Will Change Input field data
    * @access Private
    */
    const onChange = e => setContact({...contact, [e.target.name]: e.target.value})
    
    /*
    * @param Event
    * @desc Add New Contact
    * @access Private
    */
    const onSubmit = e => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>Add Contact</h2>
            
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email"name="email"value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
            
            <h5>Contact Type</h5>
            
            <input type="radio" name="type" value="personal" checked={type==="personal"} id="per" onChange={onChange}/> <label htmlFor="per">Personal</label>{" "}
            <input type="radio" name="type" value="professional" id="pro" onChange={onChange}/> <label htmlFor="pro">Professional</label>

            <div>
                <input type="submit" value="Add Contact" className="btn btn-primary"/>
            </div>

        </form>
    )
}

export default ContactForm
