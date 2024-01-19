const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Crud-app';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);

module.exports = { User };