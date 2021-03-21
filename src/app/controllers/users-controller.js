const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserSchema = require('../models/users');
const tokenValidation = require('../middlewares/access-token');
const BCRYPT_SALT_ROUNDS = 10; // Salt rounds for encrypt


// Date condition
var date = new Date();
var formatDate = date.setDate(date.getDate() - 3 );
var fDate = new Date(formatDate);

// New user service
router.post('/add', tokenValidation, async (req, res, next) => {
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS, async (err, encryptedPassword) => {
        if(err) {
            res.status(409).json({mensaje: 'An error has occurred', status:false});
            console.log('An error has occurred')
        } else {
            const user = new UserSchema({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: encryptedPassword, // Encrypted password (10 salt rounds)
                age: req.body.age,
                gender: req.body.gender,
                hobbie: req.body.hobbie
            });
            await user.save().then(response => {
            console.log('Data saved!!');
            res.send(response);
            });
        }
    });  
});

// All users sevice
router.get('/list', tokenValidation, async (req, res) => {
    const user = UserSchema;
    await user.find().then(list =>{
        res.send(list);
    });
});

// User by name and/or hobbie
router.get('/find/:param', async (req, res) =>{
    const user = UserSchema;
    const findUser = await user.find( {$or: [{name: req.params.param},{hobbie: req.params.param}] });
    if(findUser.length > 0){
        console.log('Search successful');
        res.send({findUser});
    }else{
        console.log('No results');
        res.send({mesage:'No results'});
    }
    
});


// Delete user service
router.delete('/delete/:param', tokenValidation, async (req, res) =>{
    const user = UserSchema;
    const findUser = await user.deleteOne(
        {_id: req.params.param}).then(response =>{
            console.log('User deleted!!');
            res.send({message: 'User deleted'});
    });
    
});

// Advanced search service
router.get('/advanced-search', tokenValidation, async (req, res) =>{
    const user = UserSchema;
    const findUser = await user.aggregate([
        { 
            $match: {
                $and: [{
                    age: {$gte: 18}
                },{
                    gender: 'Woman'
                },{
                    at_created: {$gte: fDate}
                }]
            }
        },
        { $group: {_id:'$hobbie', users: {$push:{name:'$name', phone: '$phone', hobbie: '$hobbie'}}} }
    ]);
    if(findUser.length > 0){
        console.log('Search successful');
        res.send({findUser});
    }else{
        console.log('No results');
        res.send({mesage:'No results'});
    }
    
});

module.exports = router;