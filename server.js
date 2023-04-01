const express = require('express');
const app = express();
const methodOverride = require('method-override');
const port = 3000;

//linking our model
const pokemon = require('./pokemon');

//middleware
//takes our data from a submitted form, encodes it, and then creates a body key that we can use later on (where we append the data into our array)
app.use(express.urlencoded({ extended:false }));
app.set('view engine', 'ejs');
//the _ needs to always be included, part of methodOverride's syntax
app.use(methodOverride('_method'));

//INDEX route
app.get('/pokemon', (req, res) => {
    res.render('index', {pokemon});
})

//NEW route
app.get('/pokemon/new', (req, res) => {
    res.render('new');
})

//SHOW route
app.get('/pokemon/:id', (req, res) => {
    let singlePokemon = pokemon[req.params.id];
    res.render('show', {singlePokemon, index: req.params.id});
})

app.post('/pokemon', (req, res) => {
    let newPokemon = {
        name: req.body.name,
        id: (pokemon.length + 1),
        type: req.body.type,
        img: req.body.img,
        misc: {
            classification: req.body.classification,
            weight: req.body.weight,
            height: req.body.height,
            abilities: {
                normal: req.body.nability,
                hidden: req.body.hability
            }
        }
    }

    pokemon.push(newPokemon);
    res.redirect('/pokemon');
})

app.get('/pokemon/:id/edit', (req, res) => {
    let singlePokemon = pokemon[req.params.id];
    res.render('edit', {singlePokemon, index: req.params.id});
})

app.put('/pokemon/:id', (req, res) => {
    let editedPokemon = {
        name: req.body.name,
        id: req.body.id,
        type: req.body.type,
        img: req.body.img,
        misc: {
            classification: req.body.classification,
            weight: req.body.weight,
            height: req.body.height,
            abilities: {
                normal: req.body.nability,
                hidden: req.body.hability
            }
        }
    }

    pokemon[req.params.id] = editedPokemon;
    res.redirect('/pokemon');
})

//DELETE route
app.delete('/pokemon/:id', (req, res) => {
    pokemon.splice(req.params.id, 1);
    res.redirect('/pokemon');
})

//FALLBACK route
app.get('/*', (req, res) => {
    res.send("You've done it now... Try again")
})

app.listen(port, () => {
    console.log('🏝️ Server is listening to 3000 🎧')
})