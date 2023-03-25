const express = require('express');
const router = express.Router();
const { Sprint, validate } = require('../models/sprintModel')
const authorization = require('../../middleware/authorization')
const { Team } = require('../models/teamModel')
const { User } = require('../models/userModel')



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


// get all task from a sprint
router.get("/:sprintid", authorization, async(req, res) => {

    const tasks = await Sprint.findById(req.params.sprintid)
        .select('tasks')
        .populate('tasks')

    
    if (!tasks) return res.status(404).json({code: 404,message : "Sprint not found"})

    for (let i = 0; i < tasks.tasks.length; i++) {
        const task = tasks.tasks[i];
        if (task.assignee) {
          try {
            const assignee = await User.findById(task.assignee).select('name email');
            task.assignee = assignee;
          } catch (error) {
            
          }
        }
      }

    res.status(200).send({
        code: 200,
        message: "Sprint found",
        sprint: tasks,
        // assignee: user
    })
})




module.exports = router;