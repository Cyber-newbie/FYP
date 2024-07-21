const express = require('express')
const {
    verifyToken
} = require('../middleware/verifyToken')
const {
    savePrediction,
    getHistories,
    getPatientHistory
} = require('../controllers/history.controller')
const router = express.Router()

router.post('/save-prediction', verifyToken, savePrediction)
router.get('/', verifyToken, getHistories)
router.get('/:id', verifyToken, getPatientHistory)


module.exports = router