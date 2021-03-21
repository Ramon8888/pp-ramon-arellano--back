const jwt = require('jsonwebtoken');
const jwtParams = require('../config/config');

// Middleware to verify token
function tokenValidation(req, res, next){
    const token = req.headers['x-access-token'];
    if(!token){
        res.send('<h2>Invalid token!!</h2><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNqp-LXtMNYZt-1t4c-cJy0E_CH5fR56x9RQ&usqp=CAU" />');
        console.log('Invalid token');
    }
    const decoded = jwt.verify(token, jwtParams.jwtKey);
    next();
}

module.exports = tokenValidation;