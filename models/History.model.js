const mongoose = require('mongoose')
const historySchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Types.ObjectId,
        ref: 'patient',
        required: true
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    predictons: [{
        type: String
    }]

}, {
    timestamps: true
})

module.exports = patient = mongoose.model('patient', patientSchema)