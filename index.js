const express = require('express');
const fs = require('fs');

//* Oggetto express
const app = express();

//* Socket
const hostname = 'localhost';
const port = 3000;

//Lettura del file
function getData(fileUrl) {
    return JSON.parse((fs.readFileSync(fileUrl)).toString());
}

//Scrittura su file (o meglio, aggiunta di nuovi dati)
function addData(fileUrl, data) {
    fs.appendFileSync(fileUrl, JSON.stringify(data));
}

//* Collezioni
const data = getData("./data.json");

//> Root: ritorna un oggetto json con esempi di possibili route a cui il server risponde.
app.get('/', (req, res) => {
    res.send({});
});

//Ritorna una lista di tutti i dischi
function getAllVinyls() {
    return data.map((disk) => { return disk.title });
}

//> Elenco di tutti i dischi: `GET /vinyls`
app.get('/vinyls', (req, res) => {
    const vinyls = getAllVinyls();
    res.send({ vinyls });
});

//Ritorna una lista di tutti gli autori
function getAllAuthors() {
    return data.map((disk) => { return disk.author.name });
}

//> Elenco degli autori: `GET /authors`
app.get('/authors', (req, res) => {
    const authors = getAllAuthors();
    res.send({ authors });
});

//Ritorna una lista di tutti i generi musicali
function getAllGenres() {
    return data.map((disk) => { return disk.genre.type });
}

//> Elenco dei generi: `GET /genres`
app.get('/genres', (req, res) => {
    const genres = getAllGenres();
    res.send({ genres });
});

//Ritorna le informazioni riguardo al disco richiesto (viene fornito l'id del vinile)
function getVinylInfo(diskId) {
    return data.filter((disk) => { return disk.diskId == diskId; });
}

//> Recupera informazioni su un disco: `GET /vinyls/:id` 
app.get('/vinyls/:diskId', (req, res) => {
    const disk = getVinylInfo(req.params.diskId);
    res.send(...disk);
});

//Ritorna una lista di dischi di un dato autore (viene fornito l'id dell'autore)
function getAuthorVinyls(authorId) {
    return (data.filter((disk) => { return disk.author.id == authorId; })).map((x) => { return x.title });
}

//> Recupera tutti i dischi di un autore: `GET /authors/:authorID/vinyls`
app.get('/authors/:authorId/vinyls', (req, res) => {
    const disks = getAuthorVinyls(req.params.authorId);
    res.send({ disks });
});

//Ritorna una lista di dischi per genere (viene fornito l'id dell'genere)
function getVinylsByGenre(genreId) {
    return (data.filter((disk) => { return disk.genre.id == genreId; })).map((x) => { return x.title });
}

//> Recupera i dischi di un genere: `GET /genres/:id/vinyls`
app.get('/genres/:genreId/vinyls', (req, res) => {
    const disks = getVinylsByGenre(req.params.genreId);
    res.send({ disks });
});

//> Server in ascolto...
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});