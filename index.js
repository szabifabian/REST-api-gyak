const express = require('express')
const tracksRouter = require('./routes/tracks')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
//const Track = require('./models/track')
const NotFoundError = require('./errors/notfound')
const HttpStatus = require('http-status-codes')
const models = require('./models')
const app = express();

const jwtMiddleware = require('express-jwt')
app.use(express.json()) //json formátumban adjuk meg az adatokat

app.use('/users', usersRouter)
app.use('/tracks', jwtMiddleware({ secret: 'titkos' }), tracksRouter)
//le van védve a tracks útvonal egy 30perces tokennel (jwt)

app.use('/auth', authRouter)

app.use((err, req, res, next) => {
    if (err instanceof NotFoundError) {
        return res
            .status(HttpStatus.NOT_FOUND) //404, csak beszédesebb
            .send({
                type: err.name,
                httpStatus: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
                message: err.message,
            })
    }
    next(err) //tovább görgessük a többi middleware felé
})

app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
            type: err.name,
            httpStatus: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
            message: err.message,
        })
})

async function start() {

    //await Track.sync()

    await models.sequelize.sync() //kivettem a force-t
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