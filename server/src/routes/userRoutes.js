const bcrypt = require('bcrypt')
const _ = require('lodash')
const authorization = require('../../middleware/authorization')
const { User, validate} =  require('../models/userModel')
const express = require('express')
const router = express.Router()


// Register new user 
router.post('/register' , async (req, res) => {
    const isValidData = validate(req.body)

    if (isValidData.error) {
        return res.status(400).send({
            code: 400,
            message: isValidData.error.details[0].message
        })
    }

    let user = await User.findOne({email: req.body.email})

    if(user) return res.status(400).json({
        message: "User already registered",
        code: 400,
        status: "Bad Request"
    })

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const response = _.pick(user, ['name', 'email'])
    response.code = 201
    response.message = "User Registed Successfully"

    res.status(201).send(response)
})



// Get User Profile
router.get('/profile', authorization, async (req, res) => {

    const user = await User.findOne({_id: req.user._id})
    res.status(200).send(_.pick(user, ['_id', 'name', 'email']))
})







// get all teams
router.get('/teams', authorization , async (req, res) => {

    const teams = await User.findOne({_id: req.user._id})
            .select(['teams'])
            .populate('teams', ['name', 'description', 'members', 'createAt'])
            .sort({createAt: -1})

    res.status(200).json({
        teams: teams.teams,
        code: 200
    })
})


module.exports = router

