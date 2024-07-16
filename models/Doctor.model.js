const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    patients: [{
        type: mongoose.Types.ObjectId,
        ref: 'patient'
    }]
}, {
    timestamps: true
})

module.exports = Doctor = mongoose.model('doctor', doctorSchema)