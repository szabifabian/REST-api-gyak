const Track = require('./models/track')

async function start() {
    await Track.sync(/*{ force: true }*/)
    //force: ha már van ilyen tracks nevű tábla, akkor azt droppolni fogja
    //és utána szinkronizál

    await Track.create({
        name: `First track`,
        color: `white`
    })
    const tracks = await Track.findAll()
    console.log(tracks)
}

start();