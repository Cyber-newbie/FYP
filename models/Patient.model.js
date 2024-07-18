const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Patient = mongoose.model('patient', patientSchema)