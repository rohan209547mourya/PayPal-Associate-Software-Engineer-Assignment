const { Team, validateTeam } = require('../model/teamModel')
const authorization = require('../../middleware/authorization')
const express = require('express');
const router = express.Router();


// create new team
router.post("/team", authorization, async(req, res) => {
    
        const isValidData = validateTeam(req.body)
    
        if (isValidData.error) {
            return res.status(400).send(isValidData.error.details[0].message)
        }
    
        const team = new Team({
            name: req.body.name,
            description: req.body.description,
            owner: req.body.user._id
        })
    
        await team.save()
    
        res.status(201).send(team)
    })
