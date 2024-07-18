const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please provide first name']
    },
    lastName: {
        type: String,
        required: [true, 'please provide last name']
    },
    email: {
        type: String,
        required: [true, 'please provide email']
    },
    password: {
        type: String,
        required: [true, ['please provide password']]
    },
    role: {
        type: String,
        default: 'doctor',
        enum: ['admin', 'doctor'],
    },
}, {
    timestamps: true
})

module.exports = User = mongoose.model('user', userSchema)