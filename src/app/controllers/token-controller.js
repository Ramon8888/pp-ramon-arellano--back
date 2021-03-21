const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const parameters = require('../config/config');

console.log(parameters.jwtKey);

// Token generator sevice
router.get('/token-generator', async (req, res) => {
    const token = jwt.sign({auth: true}, parameters.jwtKey, {
        expiresIn: parameters.timeExp
    });
    res.send({token: token})
});

module.exports = router;