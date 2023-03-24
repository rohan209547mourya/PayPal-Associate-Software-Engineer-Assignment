const express = require('express');
const router = express.Router();
const { Sprint, validate } = require('../models/sprintModel')
const authorization = require('../../middleware/authorization')
const { Team } = require('../models/teamModel')




// create new spring and add to teams
router.post("/:teamid", authorization ,async(req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send({
        code: 400,
        message: error.details[0].message
    })

    const team = await Team.findById(req.params.teamid)
    if (!team) return res.status(404).json({code: 404,message : "Team not found"})


    team.sprints.forEach(sprint => {
        if (sprint.title === req.body.title) return res.status(400).json({code: 400,message: "Sprint already exists" })
    })
    // if (sprint) return res.status(400).json({code: 400,message: "Sprint already exists" }) 

    sprint = new Sprint({
        title: req.body.title,
        description: req.body.description,
    })

    await sprint.save()
    team.sprints.push(sprint)
    await team.save()

    res.status(201).send({
        code: 201,
        message: "Sprint created successfully",
        sprint: sprint
    })
})

module.exports = router;