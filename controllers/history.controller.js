const History = require('../models/History.model')
const Patient = require('../models/Patient.model')
const savePrediction = async (req, res) => {
    const doctorId = req.user.id
    const patientData = {
        ...req.body,
        doctorId
    }
    if (!req.body['predictions'] || !req.body['patientId']) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all fields'
        })
    }
    try {
        const history = new History(patientData)
        const saved = await history.save()
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


const getHistories = async (req, res) => {
    const doctorId = req.user.id

    const lesionTypes = {
        'nv': 'Melanocytic nevi',
        'mel': 'Melanoma',
        'bkl': 'Benign keratosis-like lesions',
        'bcc': 'Basal cell carcinoma',
        'akiec': 'Actinic keratoses',
        'vasc': 'Vascular lesions',
        'df': 'Dermatofibroma'
    }

    const lesionKeys = Object.keys(lesionTypes);
    try {

        const history = await History.find({
            doctorId
        }).populate('patientId');
        const data = []
        for (const hist of history) {
            const patientId = hist.patientId._id
            const patientName = hist.patientId.firstName
            const doctorId = hist.doctorId
            const predict = hist.predictions.map((prediction, index) => {
                const lesionType = lesionKeys[index];
                return {
                    type: lesionTypes[lesionType],
                    prediction
                };
            }).sort((a, b) => b.prediction - a.prediction);

            data.push({
                patientId,
                patientName,
                doctorId,
                predictions: predict
            })

        }

        return res.status(200).json({
            success: true,
            data

        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }

}

const getPatientHistory = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const patient = await Patient.findOne({
            _id: id
        })
        console.log(patient)
        if (!patient) return res.status(400).json({
            success: false,
            error: 'patient not found'
        })
        const history = await History.find({
            patientId: patient._id
        })
        return res.status(200).json({
            success: true,
            data: history
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    savePrediction,
    getHistories,
    getPatientHistory
}