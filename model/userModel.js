const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
            },
            message: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long',
        },
    },
    mobile: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => /^[0-9]{10}$/.test(value.toString()),
            message: 'Please enter a valid 10-digit mobile number',
        },
    },
    city: {
        type: String,
    },
});

const User = model('User', userSchema);

module.exports = { User };