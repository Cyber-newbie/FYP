const Joi = require('joi')

const patientSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'Please provide first name'
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'Please provide last name'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Please provide a valid email address'
    }),

    phone: Joi.string()
})
const updatePatientSchema = Joi.object({
    _id: Joi.string().required().messages({
        'string.empty': 'Please provide patient _id'
    }),
    firstName: Joi.string().required().messages({
        'string.empty': 'Please provide first name'
    }),
    lastName: Joi.string().required().messages({
        'string.empty': 'Please provide last name'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Please provide a valid email address'
    }),

    phone: Joi.string()
})
module.exports = {
    patientSchema,
    updatePatientSchema
}