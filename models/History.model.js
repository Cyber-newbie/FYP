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
    predictions: [{
        type: Number
    }],

}, {
    timestamps: true
})

module.exports = History = mongoose.model('history', historySchema)