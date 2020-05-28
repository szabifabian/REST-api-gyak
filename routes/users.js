const express = require('express');
//const asyncHandler = require('express-async-handler') //hibakezelő
const router = express.Router()
const Track = require('../models').track
const User = require('../models').user

router.
    post('/:userId/tracks', async (req, res) => {
        const userId = req.params.userId
        const track = req.body

        const user = await User.findOne({ where: { id: userId } })
        const newTrack = await Track.create(track)

        await newTrack.setUser(user)
        res.send(newTrack)
    })

module.exports = router