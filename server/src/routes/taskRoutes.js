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
        return res.status(400).json({code: 400,message: isValidData.error.details[0].message})
    }

    const sprint = await Sprint.findById(req.params.sprintid)

    if (!sprint) {
        return res.status(404).json({code:404,message: "Sprint not found"})
    }

    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type
    })


    // console.log(sprint.tasks);

    await task.save()
    sprint.tasks.push(task)
    await sprint.save()


    res.status(201).send({
        code: 201,
        message: "Task created successfully",
        task: task
    })
})


// assign task to a user
router.put("/assignee", authorization, async(req, res) => {


    const {sprintId, taskId, email, teamId} = req.body

    console.log(teamId);

    const sprint = await Sprint.findById(sprintId)
    if (!sprint) {
        return res.status(404).json({code:404, message : "Sprint not found"})
    }

    const task = await Task.findById(taskId)
    if (!task) {
        return res.status(404).json({code:404, message: "Task not found"})
    }
    else if(task.assignee) {
        return res.status(400).json({code:400, message: "Task already assigned"})
    }

    const team = await Team.findById(teamId)
    if (!team) {
        return res.status(404).json({code:404, message: "Team not found" })
    }


    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(404).json({code:404, message: "User not found! Invalid Email id"})
    }

    let isSprintInTeam = false;
    team.sprints.forEach(sprint => {
        if (sprint._id.toString() === sprintId.toString()) {
            isSprintInTeam = true
        }
    })

    if (!isSprintInTeam) {
        return res.status(400).json({code:400, message: "Sprint is not in this team"})
    }
    
    let isUserInTeam = false;
    team.members.forEach(member => {
        if (member._id.toString() === user._id.toString()) {
            isUserInTeam = true
        }
    })

    if (!isUserInTeam) {
        return res.status(400).json({code:400, message: "User is not in this team" })
    }

    task.assignee = user
    await task.save()

    if(user.tasks) {

        user.tasks.push(task)   
    }
    else{

        user.tasks = [task]
    }

    await user.save()

    res.status(201).send(task)
})


// change task status
router.put("/:id", authorization, async(req, res) => {

    const task = await Task.findById(req.params.id)

    if (!task) {
        return res.status(404).json({code:404, message: "Task not found"})
    }

    if(!task.assignee === req.user._id.toString()) {
        return res.status(403).json({code:403, message: "You are not allowed to change this task status"})
    }

    task.status = req.body.status
    await task.save()

    res.status(201).send({
        code: 201,
        task: task
    })
})

module.exports = router;