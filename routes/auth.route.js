const express = require('express')
const {
    validate
} = require('../middleware/validate.schema')
const {
    registerSchema,
    loginSchema
} = require('../schemas/auth.schema')
const {
    signUp,
    login
} = require('../controllers/auth.controller')
const router = express.Router()

router.post('/signup', validate(registerSchema), signUp)
router.post('/login', validate(loginSchema), login)


module.exports = router