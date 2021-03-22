const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Mongoose config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(db => console.log('✓ Connection successful!'))
.catch(err => console.log(err));

module.exports = router;