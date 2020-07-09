import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';
const ContactForm = () => {

    // Initialize context
    const contactContext = useContext(ContactContext);
    const { addContact, current, clearCurrent, updateContact } = contactContext;
    
    useEffect( () => {
        if(current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    // Destructering state value
    const {name, email, phone, type} = contact;
    



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

        if(!current) {
            addContact(contact);
        } else {
            updateContact(contact);
        }


        // setContact({
        //     name: '',
        //     email: '',
        //     phone: '',
        //     type: 'personal'
        // });
    }

    /*
    * Clear Current Contact from form
    */
    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email"name="email"value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
            
            <h5>Contact Type</h5>
            
            <input type="radio" name="type" value="personal" checked={type==="personal"} id="per" onChange={onChange}/> <label htmlFor="per">Personal</label>{" "}
            <input type="radio" name="type" value="professional" id="pro" onChange={onChange}/> <label htmlFor="pro">Professional</label>

            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block"/>
                {current && (<div>
                    <input type="submit" value="Clear Contact" className="btn btn-light btn-block" onClick={clearAll}/>
                </div>)}
            </div>

        </form>
    )
}

export default ContactForm
