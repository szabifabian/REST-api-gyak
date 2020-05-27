const express = require('express');
const asyncHandler = require('express-async-handler') //hibakezelő
const router = express.Router()
const Track = require('../models/track')
/*
    GET     /tracks  --trackek lekérése
    GET     /tracks/:id   --egy track id alapján lekérni
    POST    /tracks    --új track
    PUT     /tracks/:id  --csere, felülírás (!!minden mezőjét 
                meg kell adni az objektumnak)
    PATCH   /tracks/:id --módosítás
    DELETE  /tracks    ---mindent töröl
    DELETE  /tracks/:id --egy adott tracket töröl

*/


router
    .get('/', asyncHandler(async (req, res) => {

        const allTracks = await Track.findAll();
        res.send(allTracks)
    }
    ))

    .post('/', asyncHandler(async (req, res) => {

        const reqTrack = req.body
        const newTrack = await Track.create(reqTrack)
        res.send(newTrack)
    }
    ))

    .get('/:id', asyncHandler(async (req, res) => {
        const id = req.params.id
        const track = await Track.findOne({ where: { id: id } })
        res.send(track ? track : 404)
    }
    ))

    .put('/:id', asyncHandler(async (req, res) => {
        const id = req.params.id
        const reqTrack = req.body
        const newTrack = await Track.update(reqTrack, { where: { id: id } })
        res.send(newTrack)
    }
    ))

    .patch('/:id', (req, res) => //hasonlóan, mint a put metódusnál
        res.send(`Patch`)
    )

    .delete('/:id', asyncHandler(async (req, res) => {
        const id = req.params.id
        await Track.destroy({ where: { id: id } })
        res.send(204)

    }))

    .delete('/', asyncHandler(async (req, res) => {
        await Track.destroy({ truncate: true })
        res.send(204)
    }))

module.exports = router;



