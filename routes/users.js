const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');   

/*
* @route POST api/users
* @desc Register a user
* @access Public
*/
router.post('/', [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json({errors: errors.array()})
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        console.log("User: "+user)
        if(user) {
            return res.status(401).json({msg: "User already exists"});
        }

        user = new User({name, email, password});
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        const playLoad = {
            user: {
                id: user.id
            }
        }

        let token = jwt.sign(playLoad, config.get('jwtSecret'), {expiresIn:36000}, (err, token)=>{
            if(err) throw err;
            res.json({token});
        });

    } catch (error) {
        console.log("FROM User: "+error.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;