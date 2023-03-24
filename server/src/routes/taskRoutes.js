const { Task, validateTask } = require('../models/taskModel')
const express = require('express')
const router = express.Router()
const authorization = require('../../middleware/authorization')
const { Sprint } = require('../models/sprintModel')
const { Team } = require('../models/teamModel')
const { User } = require('../models/userModel')



// create new task
router.post("/:sprintid", authorization, async(req, res) => {

    const isValidData = validateTask(req.body)

    if (isValidData.error) {
        return res.status(400).json({message: isValidData.error.details[0].message})
    }

    const sprint = await Sprint.findById(req.params.sprintid)

    if (!sprint) {
        return res.status(404).json({message: "Sprint not found"})
    }

    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type
    })

    await task.save()

    sprint.tasks.push(task)
    await sprint.save()

    res.status(201).send(task)
})


// assign task to a user
router.post("/", authorization, async(req, res) => {


    const {sprintId, taskId, userId, teamId} = req.body

    const sprint = await Sprint.findById(sprintId)
    if (!sprint) {
        return res.status(404).json({message : "Sprint not found"})
    }

    const task = await Task.findById(taskId)
    if (!task) {
        return res.status(404).json({message: "Task not found"})
    }
    else if(task.assignee) {
        return res.status(400).json({message: "Task already assigned"})
    }

    const team = await Team.findById(teamId)
    if (!team) {
        return res.status(404).json({message: "Team not found" })
    }


    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({message: "Team not found"})
    }

    let isSprintInTeam = false;
    team.sprints.forEach(sprint => {
        if (sprint._id.toString() === sprintId.toString()) {
            isSprintInTeam = true
        }
    })

    if (!isSprintInTeam) {
        return res.status(400).json({message: "Sprint is not in this team"})
    }
    
    let isUserInTeam = false;
    team.members.forEach(member => {
        if (member._id.toString() === user._id.toString()) {
            isUserInTeam = true
        }
    })

    if (!isUserInTeam) {
        return res.status(400).json({message: "User is not in this team" })
    }

    task.assignee = user
    await task.save()
    user.tasks.push(task)   
    await user.save()

    res.status(201).send(task)
})


// change task status
router.put("/:id", authorization, async(req, res) => {

    const task = await Task.findById(req.params.id)

    if (!task) {
        return res.status(404).json({message: "Task not found"})
    }

    if(!task.assignee.toString() === req.user._id.toString()) {
        return res.status(403).json({message: "You are not allowed to change this task status"})
    }

    task.status = req.body.status
    await task.save()

    res.status(201).send(task)
})

module.exports = router;