const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config'); 
const auth = require('../middlewares/auth');

const User = require('../models/User');

/*
* @route    GET api/auth
* @desc     Get logged in user
* @access   Private
*/
router.get('/', auth, async (req, res)=>{
    try {
        let user = await User.findById(req.user.id);//.select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
})

/*
* @route    POST api/auth
* @desc     Auth user & get token
* @access   Public
*/
router.post('/', [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({msg: 'Invalid Credentials'});
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({msg: 'Invalid Credentials'});
        }

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
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router;