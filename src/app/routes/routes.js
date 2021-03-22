const express = require('express');
const router = express.Router();
const usersRoutes = require('../controllers/users-controller');
const jwtGen = require('../controllers/token-controller');

//Initial route
router.get('/', (req, res) =>{
    console.log('All right compa!!');
    res.send('All right compa!!');
});

// Controllers
router.use(usersRoutes);
router.use(jwtGen);


module.exports = router;