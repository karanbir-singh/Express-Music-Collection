const express = require('express');

//* Oggetto express
const app = express();

//* Socket
const hostname = 'localhost';
const port = 3000;

//> Root: ritorna un oggetto json con esempi di possibili route a cui il server risponde.
app.get('/', (req,res) => {
    //
    res.send({});
});

//> Elenco di tutti i dischi: `GET /vinyls`
app.get('/vinyls', (req,res) => {
    res.send([{
        title:"disco 1",
        author: 1
    },{
        title: "disco 2",
        author: 2
    }]);
});

//> Elenco degli autori: `GET /authors/`
app.get('/authors', (req,res) => {
    res.send([{
        name: 'Eminem',
        id: 1
    },{
        titolo: "Nirvana",
        id: 2
    }]);
});

//> Elenco dei generi: `GET /genres`
app.get('/genres', (req,res) => {
    res.send([{
        type: 'Jazz',
        id: 1
    },{
        titolo: "Pop",
        id: 2
    }]);
});

//> Recupera informazioni su un disco: `GET /vinyls/:id` 
app.get('/vinyls/:id', (req,res) => {
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
