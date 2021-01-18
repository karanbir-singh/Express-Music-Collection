const express = require('express');

//* Oggetto express
const app = express();

//* Socket
const hostname = 'localhost';
const port = 3000;

//* Collezione di dischi
const disks = [
    { id: 1, title: "Sgt. Pepper's Lonely Hearts Club Band" }, //The Beatles
    { id: 2, title: "Revolver" }, //The Beatles
    { id: 3, title: "Exile on Main St." }, //The Rolling Stones
    { id: 4, title: "Led Zeppelin" }, //Led Zeppelin
    { id: 5, title: "Let It Bleed" }, //The Rolling Stones
    { id: 6, title: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars" }, //David Bowie
    { id: 7, title: "Never Mind the Bollocks, Here's the Sex Pistols " }, //Sex pistols
    { id: 8, title: "The Dark Side of the Moon" }, //Pink Floyd
    { id: 9, title: "Bitches Brew" }, //Miles Davis
    { id: 10, title: "A love supreme" } //John Coltrane
];

//* Collezione di autori
const authors = [
    { id: 1, name: "The Beatles" },
    { id: 2, name: "The Rolling Stones" },
    { id: 3, name: "Led Zeppelin" },
    { id: 4, name: "David Bowie" },
    { id: 5, name: "Sex pistols" },
    { id: 6, name: "Pink Floyd" },
    { id: 7, name: "Miles Davis" },
    { id: 8, name: "John Coltrane" }
];

//* Collezione di generi
const genres = [
    { id: 1, type: "Pop rock" }, 
    { id: 2, type: "Hard rock" }, 
    { id: 3, type: "Country rock" }, 
    { id: 4, type: "Glam rock" },
    { id: 5, type: "Punk rock" },
    { id: 6, type: "Jazz" },];

//> Root: ritorna un oggetto json con esempi di possibili route a cui il server risponde.
app.get('/', (req, res) => {
    res.send({});
});

//> Elenco di tutti i dischi: `GET /vinyls`
app.get('/vinyls', (req, res) => {
    res.send([{
        title: "disco 1",
        author: 1
    }, {
        title: "disco 2",
        author: 2
    }]);
});

//> Elenco degli autori: `GET /authors`
app.get('/authors', (req, res) => {
    res.send([{
        name: 'Eminem',
        id: 1
    }, {
        titolo: "Nirvana",
        id: 2
    }]);
});

//> Elenco dei generi: `GET /genres`
app.get('/genres', (req, res) => {
    res.send([{
        type: 'Jazz',
        id: 1
    }, {
        titolo: "Pop",
        id: 2
    }]);
});

//> Recupera informazioni su un disco: `GET /vinyls/:id` 
app.get('/vinyls/:id', (req, res) => {
    const { id } = req.params;

    // TODO: recupero dettagli vinile richiesto

    //Ritorno valori al cliente
    res.send({});
});

//> Recupera tutti i dischi di un autore: `GET /authors/:authorID/vinyls`
//> Recupera i dischi di un genere: `GET /genres/:id/vinyls` 

//> Server in ascolto...
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
