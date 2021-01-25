const express = require('express');
const fileSystem = require('fs');
const fs = require('./script.js');
const cors = require('cors');

//* Oggetto express
const app = express();

//Content-Type: application/json e CORS
app.use(express.json);
app.use(express.cors);

//* Socket
const hostname = 'localhost';
const port = 3000;

//* Collezioni
const data = fs.getData("./data.json");

//> Root: ritorna un oggetto json con esempi di possibili route a cui il server risponde.
app.get('/', (req, res) => {
    res.send({});
});

//> Elenco di tutti i dischi: `GET /vinyls`
app.get('/vinyls', (req, res) => {
    const vinyls = fs.getAllVinyls(data);
    res.send({ vinyls });
});

//> Elenco degli autori: `GET /authors`
app.get('/authors', (req, res) => {
    const authors = fs.getAllAuthors(data);
    res.send({ authors });
});

//> Elenco dei generi: `GET /genres`
app.get('/genres', (req, res) => {
    const genres = fs.getAllGenres(data);
    res.send({ genres });
});

//> Recupera informazioni su un disco: `GET /vinyls/:id` 
app.get('/vinyls/:diskId', (req, res) => {
    const disk = fs.getVinylInfo(data,req.params.diskId);
    res.send(...disk);
});

//> Recupera tutti i dischi di un autore: `GET /authors/:authorID/vinyls`
app.get('/authors/:authorId/vinyls', (req, res) => {
    const disks = fs.getAuthorVinyls(data,req.params.authorId);
    res.send({ disks });
});

//> Recupera i dischi di un genere: `GET /genres/:id/vinyls`
app.get('/genres/:genreId/vinyls', (req, res) => {
    const disks = fs.getVinylsByGenre(data,req.params.genreId);
    res.send({ disks });
});

//TODO richieste POST, ma è privato

//> Server in ascolto...
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// const uuid = require("uuid");

// console.log(uuid.v4());