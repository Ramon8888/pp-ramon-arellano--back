const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model for Users CRUD 
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function(name){
                return name.length >= 4;
            },
            'The name must have at least 4 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function(phone){
                return phone.length >= 10;
            },
            'The number phone must have at least 10 digits']
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['M','F']
    },
    hobbie: {
        type: String,
        required: true
    },
    at_created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    } 
});

module.exports = mongoose.model('users', UserSchema);