const { Team, validateTeam } = require('../models/teamModel')
const authorization = require('../../middleware/authorization')
const { User } = require('../models/userModel')
const express = require('express');
const _ = require('lodash')
const router = express.Router();


// create new team
router.post("/", authorization, async(req, res) => {

    const isValidData = validateTeam(req.body)

    if (isValidData.error) {
        return res.status(400).send(isValidData.error.details[0].message)
    }

    const team = new Team({
        name: req.body.name,
        description: req.body.description,
        createdBy: req.user._id
    })

    await team.save()

    res.status(201).send(team)
})



// add new member
router.post("/:id/member", authorization, async(req, res) => {

    const team = await Team.findById(req.params.id)

    if (!team) {
        return res.status(404).json({message: "Team not found"})
    }

    if (team.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({message: "You are not allowed to add member to this team" })
    }

    const member = await User.findOne({email: req.body.email})
    if (!member) {
        return res.status(404).json({message: "User not found"})
    }

    let isAlreadyMemberAdded = false;

    team.members.forEach(el => {
        if (member._id.toString() === el.toString()) {
            isAlreadyMemberAdded = true
        }
    })

    member.teams.push(team)

    if (isAlreadyMemberAdded) {
        return res.status(400).json({message: "This member is already added to this team"})
    }
    
   
    
    team.members.push(_.pick(member, ['_id','name']))

    await team.save()
    await member.save()

    res.status(201).send(team)
})


// get team by id
router.get("/:id", authorization, async(req, res) => {

    const team = await Team.findById(req.params.id)

    if (!team) {
        return res.status(404).json({message: "Team not found"})
    }
    res.send(team)
})

// get all teams
router.get("/", authorization, async(req, res) => {

    const teams = await Team.find({createdBy: req.user._id})

    res.send(teams)
})

module.exports = router