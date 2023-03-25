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
        return res.status(400).json({
            code: 400,
            message: isValidData.error.details[0].message
        })
    }

    const team = new Team({
        name: req.body.name,
        description: req.body.description,
        createdBy: req.user._id
    })

    const user = await User.findById(req.user._id)


    team.members.push(user)

    await team.save()

    user.teams.push(team)

    await user.save()


    res.status(201).send( {
        code: 201,
        message: "Team created successfully",
        team: team
    })
})



// add new member
router.post("/:id/member", authorization, async(req, res) => {

    const team = await Team.findById(req.params.id)

    if (!team) {
        return res.status(404).json({code: 404, message: "Team not found"})
    }

    if (team.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({code: 403, message: "You are not allowed to add member to this team" })
    }

    const member = await User.findOne({email: req.body.email})
    if (!member) {
        return res.status(404).json({code:404, message: "User not found"})
    }

    let isAlreadyMemberAdded = false;

    team.members.forEach(el => {
        if (member._id.toString() === el.toString()) {
            isAlreadyMemberAdded = true
        }
    })

    member.teams.push(team)

    if (isAlreadyMemberAdded) {
        return res.status(400).json({code:400 , message: "This member is already added to this team"})
    }
    
   
    
    team.members.push(_.pick(member, ['_id','name']))

    await team.save()
    await member.save()

    team.code = 201

    res.status(201).send(team)
})


// get team by id
router.get("/:id", authorization, async(req, res) => {

    const team = await Team.findById(req.params.id)


    if (!team) {
        return res.status(404).json({code: 404,message: "Team not found"})
    }
    res.status(200).send(team)
})

// get all sprints by team id

router.get("/:id/sprints", authorization, async(req, res) => {

    const sprints = await Team.findById(req.params.id)
                .select('sprints')
                .populate('sprints', 'title description startDate')

    if (!sprints) {
        return res.status(404).json({message:404, message: "Team not found"})

    }

    res.status(200).send({
        code: 200,
        message: "Sprints fetched successfully",
        sprints: sprints.sprints
    })
})


module.exports = router