const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    doctors: [{
        type: mongoose.Types.ObjectId,
        ref: 'doctor'
    }]
}, {
    timestamps: true
})

module.exports = patient = mongoose.model('patient', patientSchema)