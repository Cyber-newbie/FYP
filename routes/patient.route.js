const express = require('express')
const {
    validate
} = require('../middleware/validate.schema')
const {
    patientSchema,
    updatePatientSchema
} = require('../schemas/patient.schema')
const {
    verifyToken
} = require('../middleware/verifyToken')
const {
    addPatient,
    deletePatient,
    updatePatient,
    getPatients
} = require('../controllers/patient.controller')
const router = express.Router()
router.get('/', verifyToken, getPatients)
router.post('/add', validate(patientSchema), verifyToken, addPatient)
router.put('/update', validate(updatePatientSchema), verifyToken, updatePatient)
router.delete('/delete', verifyToken, deletePatient)

module.exports = router