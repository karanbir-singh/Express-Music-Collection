const express = require('express');
const fs = require('./script.js');
const cors = require('cors');

//* Oggetto express
const app = express();

//Content-Type: application/json e CORS
app.use(express.json());
app.use(cors());

//* Socket
const hostname = 'localhost';
const port = 3000;

//> Root: ritorna un oggetto json con esempi di possibili route a cui il server risponde.
app.get('/', (req, res) => {
    res.send({});
});

//> Elenco di tutti i dischi: `GET /vinyls`
app.get('/vinyls', (req, res) => {
    //const vinyls = fs.getAllVinyls();
    res.send(fs.getAllVinyls());
});

//> Elenco degli autori: `GET /authors`
app.get('/authors', (req, res) => {
    //const authors = fs.getAllAuthors();
    res.send(fs.getAllAuthors());
});

//> Elenco dei generi: `GET /genres`
app.get('/genres', (req, res) => {
    //const genres = fs.getAllGenres();
    res.send(fs.getAllGenres());
});

//> Recupera informazioni su un disco: `GET /vinyls/:id` 
app.get('/vinyls/:diskId', (req, res) => {
    //const disk = fs.getVinylInfo(req.params.diskId);
    res.send(fs.getVinylInfo(req.params.diskId));
});

//> Recupera tutti i dischi di un autore: `GET /authors/:authorID/vinyls`
app.get('/authors/:authorId/vinyls', (req, res) => {
    //const disks = fs.getAuthorVinyls(req.params.authorId);
    res.send(fs.getAuthorVinyls(req.params.authorId));
});

//> Recupera i dischi di un genere: `GET /genres/:id/vinyls`
app.get('/genres/:genreId/vinyls', (req, res) => {
    //const disks = fs.getVinylsByGenre(req.params.genreId);
    res.send(fs.getVinylsByGenre(req.params.genreId));
});

//TODO richieste POST, ma è privato
app.post('/', (req, res) => {
    //.header("Content-Type", "application/json");
});

//> Server in ascolto...
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});