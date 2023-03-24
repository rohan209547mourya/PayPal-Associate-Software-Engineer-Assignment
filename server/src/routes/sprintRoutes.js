const express = require('express');
const router = express.Router();
const { Sprint, validate } = require('../models/sprintModel')
const authorization = require('../../middleware/authorization')
const { Team } = require('../models/teamModel')




// create new spring and add to teams
router.post("/:teamid", authorization ,async(req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    console.log(req.params.teamid);
    const team = await Team.findById(req.params.teamid)
    if (!team) return res.status(404).json({message : "Team not found"})


    let sprint = await Sprint.findOne({title: req.body.title})

    console.log(sprint);

    if (sprint) return res.status(400).json({message: "Sprint already exists" }) 

    sprint = new Sprint({
        title: req.body.title,
        description: req.body.description,
    })

    await sprint.save()
    team.sprints.push(sprint)
    await team.save()

    res.status(201).send(sprint)
})

module.exports = router;