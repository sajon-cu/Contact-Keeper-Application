const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    let token = req.header('x-auth-token');

    // Check if not token
    if(!token) {
        return res.status(401).json({msg: 'No token, Authorization denied'});
    }

    try {
        let decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({msg: 'Token is not valid'});
    }
}