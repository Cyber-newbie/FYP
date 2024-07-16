const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const signUp = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (user) {
        res.status(400).json({
            msg: 'email already exist'
        })
    } else {

        const newUser = new User(req.body)
        try {
            await newUser.validate()
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newUser.password, salt)
            newUser.password = hashedPassword
            const user = await newUser.save()
            return res.status(201).json({
                success: true,
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });

        }
    }
}


const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                email: 'You are not signed up. Please Create account'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const payload = {
                id: user.id,
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 3600
            })
            return res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                data: user
            })
        } else {
            return res.status(400).json({
                password: 'Incorrect email/password'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}



module.exports = {
    signUp,
    login
}