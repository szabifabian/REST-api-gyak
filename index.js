const express = require('express')
const tracksRouter = require('./routes/tracks')
const Track = require('./models/track')

const app = express();
app.use(express.json())

app.use('/tracks', tracksRouter)

async function start() {

    await Track.sync()
    const port = process.env.PORT || 3000; //így szokás megadni a portot
    app.listen(port, () =>
        console.log(`Szerver fut a ${port} - es porton`)
    )
}

start()





/*
REST-NEK EGY ALAPKÖVETELMÉNYÉVEL ÁLL SZEMBEN: ÁLLAPOTMENTESSÉG
let counter = 0
app.post('/test', (req, res) => {
    counter++
    res.send(`OK`)
}
)

app.get('/test', (req, res) =>
    res.send({ counter })
)
*/