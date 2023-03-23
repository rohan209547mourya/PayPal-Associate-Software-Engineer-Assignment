const express = require('express');
const router = express.Router();
const { Sprint, validate } = require('../models/sprintModel')



router.post('/', async(req, res) => {

    const isValidData = validate(req.body)

    if (isValidData.error) {
        return res.status(400).send(isValidData.error.details[0].message)
    }

    const sprint = new Sprint({
        title: req.body.name,
        description: req.body.description,
    })

    await sprint.save()

    res.status(201).send(sprint)
})