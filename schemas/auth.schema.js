const Joi = require('joi')

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Please provide a valid email address'
    }),
    password: Joi.string().min(6).max(20).pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .required().messages({
            'string.min': 'Passord must be at least {#limit} characters long',
            'string.max': 'Passord must be less than equal to {#limit} characters long',
            'any.required': 'Password is required',
            'string.pattern.base': 'Password must contain at least one number and one special character'
        }),
    role: Joi.string().valid('admin', 'doctor', 'patient').required().messages({
        'any.required': 'Please provide role',
        'any.only': 'Role must be one of admin, doctor or patient'
    }),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required!',
        'string.email': 'Please provide a valid email address!'
    }),
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required!', // provide a custom message for required
            'string.empty': 'Please provide a password', // handle empty password string
        })
});

module.exports = {
    registerSchema,
    loginSchema
}