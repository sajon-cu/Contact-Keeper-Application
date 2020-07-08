const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

/*
* @route    GET api/contacts
* @desc     Get all users contacts
* @access   Private
*/
router.get('/', auth, async (req, res)=>{
    try {
        let userContatcs = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(userContatcs);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

/*
* @route    POST api/contacts
* @desc     Add new contact
* @access   Private
*/
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json({errors: errors.array()})
    }

    const {name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name, email, phone, type, user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})


/*
* @route    PUT api/contacts:id
* @desc     Update old contact
* @access   Private
*/
router.put('/:id', auth, async (req, res)=>{
    const {name, email, phone, type} = req.body;

    //Build contact object
    const contactField = {};
    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(401).json({msg: 'Contact not found'});

        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not Authorized'});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set: contactField },
            { new : true });
        res.json(contact);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})


/*
* @route    DELETE api/contacts:id
* @desc     Delete contact
* @access   Private
*/
router.delete('/:id', auth, async (req, res)=>{
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(401).json({msg: 'Contact not found'});

        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not Authorized'});
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg: 'Contact Removed'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;