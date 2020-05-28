const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

router
    .post('/login', async (req, res) => {
        const token = jwt.sign({ username: 'user1' }, 'titkos' /*never use it in this way*/, {
            expiresIn: '30m'
        })

        res.send(token)
    })

module.exports = router