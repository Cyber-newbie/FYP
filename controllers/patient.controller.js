const {
    default: mongoose
} = require('mongoose')
const Patient = require('../models/Patient.model')

const getPatients = async (req, res) => {
    const doctorId = req.user.id
    try {
        const patients = await Patient.find({
            doctorId
        })
        return res.status(200).json({
            success: true,
            data: patients
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            error: error.message
        })
    }

}

const getPatientById = async (req, res) => {

    const {
        id
    } = req.params;
    const doctorId = req.user.id
    try {
        const patientData = await Patient.findOne({
            _id: id,
            doctorId
        });
        if (!patientData) {
            return res.status(404).json({
                success: false,
                error: 'Patient not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: patientData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const addPatient = async (req, res, next) => {
    console.log('adddding')
    const doctorId = req.user.id
    const patientData = {
        ...req.body,
        doctorId
    }
    const email = await Patient.findOne({
        email: req.body.email
    })
    if (email) return res.status(400).json({
        success: false,
        error: 'email already exists'
    })
    try {
        const patient = new Patient(patientData)
        const saved = await patient.save()
        return res.status(201).json({
            success: true,
            data: saved
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const updatePatient = async (req, res) => {
    const patientData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone || null,
    }
    try {
        const isPatient = await Patient.findOne({
            _id: req.body._id
        })
        if (!isPatient) return res.status(400).json({
            success: false,
            error: 'patient not found'
        })
        const patient = await Patient.findOneAndUpdate({
            _id: req.body._id
        }, patientData, {
            new: true
        })
        return res.status(201).json({
            success: true,
            data: patient
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const deletePatient = async (req, res) => {
    try {
        const patientId = req.body.patientId
        if (!patientId) return res.status(400).json({
            success: false,
            error: 'Please provide patient id'
        })
        const isPatient = await Patient.findOne({
            _id: patientId
        })
        if (isPatient) {

            await Patient.findOneAndDelete({
                _id: patientId
            })
            return res.status(200).json({
                success: true
            })
        } else {
            return res.status(400).json({
                success: false,
                error: 'patient not found'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    getPatients,
    getPatientById,
    addPatient,
    updatePatient,
    deletePatient
}