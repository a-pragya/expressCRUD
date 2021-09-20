const path = require('path');
const express = require('express')
const app = express()
const { v4: uuid } = require('uuid')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let songsData = [
    {
        id: uuid(),
        name: 'Nuvole Bianche',
        musician: 'italian dude',
        likes: 10
    },
    {
        id: uuid(),
        name: 'Moonlight Sonata',
        musician: 'Beethoven',
        likes: 13
    },
    {
        id: uuid(),
        name: 'Fur elise',
        musician: 'Beethoven',
        likes: 100
    },
    {
        id: uuid(),
        name: 'Bella Ciao',
        musician: 'italian folk song',
        likes: 102
    }
]

app.get('/', (req, res) => {
    console.log("home");
    res.render('home', { songsData });
})

app.get('/songs', (req, res) => {
    console.log("get songs");
    //res.render('home', { songsData });
    res.redirect('/')
})

app.get('/songs/new', (req, res) => {
    console.log("render add new song form")
    res.render('addNewSong')
})

app.get('/songs/edit/:id', (req, res) => {
    const { id } = req.params;
    const song = songsData.find(s => s.id === id);
    console.log("id and song", id, song)
    res.render('editSong', { song });
})

app.get('/songs/:id', (req, res) => {
    console.log("song id");
    const { id } = req.params;
    console.log("id", id);
    const songFound = songsData.find(c => c.id === id);
    console.log("song found", songFound);
    if (songFound) {
        res.render('song', { songFound });
    }
    else {
        res.send("Song not found");
    }

})

app.post('/songs', (req, res) => {
    console.log("add new song")
    const { name, musician, likes } = req.body;
    songsData.push({ name, musician, likes, id: uuid() })
    res.redirect('/songs')
})

app.patch('/songs/:id', (req, res) => {
    console.log("update song")
    const { id } = req.params;
    const { name, musician, likes } = req.body;
    const foundSong = songsData.find(s => s.id === id);
    foundSong.name = name;
    foundSong.musician = musician;
    foundSong.likes = likes;
    res.redirect('/')
})

app.delete('/songs/:id', (req, res) => {
    console.log("delete id");
    const { id } = req.params;
    songsData = songsData.filter(s => s.id !== id);
    res.redirect('/')

})


app.listen(3000, () => {
    console.log("listening")
})