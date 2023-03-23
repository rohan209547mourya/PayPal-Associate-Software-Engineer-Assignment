const bcrypt = require('bcrypt')
const { User } =  require('../models/userModel')
const express = require('express')
const Joi = require('joi')
const router = express.Router()



router.post('/login', async (req, res) => {

    const isValidData = validate(req.body)

    if (isValidData.error) {
        return res.status(400).send(isValidData.error.details[0].message)
    }


    const user = await User.findOne({email: req.body.email})

    const errorMessage = {
        message: "Invalid email or password",
        code: 400,
        status: "Bad Request"
    }
    

    if(!user) return res.status(400).json(errorMessage)

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if(!isPasswordValid) return res.status(400).json(errorMessage)

    const token = user.generateAuthToken()

    res.json({
        message: "User Logged In Successfully",
        code: 200,
        status: "OK",
        token: token
    })
})


function validate(user) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required()
    })
    return schema.validate(user)
}


module.exports = router