const express = require('express');
const fs = require('fs');

//* Oggetto express
const app = express();

//* Socket
const hostname = 'localhost';
const port = 3000;


//* Collezioni
const data = fs.readFileSync("./data.json");
console.log(data);

//> Root: ritorna un oggetto json con esempi di possibili route a cui il server risponde.
app.get('/', (req, res) => {
    res.send({});
});

//> Elenco di tutti i dischi: `GET /vinyls`
app.get('/vinyls', (req, res) => {
    const disks = data.map((disk) => { return disk.title });
    res.send({ disks });
});

//> Elenco degli autori: `GET /authors`
app.get('/authors', (req, res) => {
    const authors = data.map((disk) => { return disk.author.name });
    res.send({ authors });
});

//> Elenco dei generi: `GET /genres`
app.get('/genres', (req, res) => {
    const genres = data.map((disk) => { return disk.genre.type });
    res.send({ genres });
});

//> Recupera informazioni su un disco: `GET /vinyls/:id` 
app.get('/vinyls/:diskId', (req, res) => {
    const { diskId } = req.params;
    const disk = data.filter((disk) => { return disk.diskId == diskId; });
    res.send(...disk);
});

//> Recupera tutti i dischi di un autore: `GET /authors/:authorID/vinyls`
app.get('/authors/:authorId/vinyls', (req, res) => {
    const { authorId } = req.params;
    const disks = (data.filter((disk) => { return disk.author.id == authorId; })).map((x) => { return x.title });
    res.send({ disks });
});

//> Recupera i dischi di un genere: `GET /genres/:id/vinyls`
app.get('/genres/:genreId/vinyls', (req, res) => {
    const { genreId } = req.params;
    const disks = (data.filter((disk) => { return disk.genre.id == genreId; })).map((x) => { return x.title });
    res.send({ disks });
});

//> Server in ascolto...
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});