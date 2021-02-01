const fileSystem = require('fs');

module.exports = {
    //GETs
    getAllVinyls,
    getAllAuthors,
    getAllGenres,
    getVinylInfo,
    getAuthorVinyls,
    getVinylsByGenre,

    //POSTs
    postVinyl,
    postAuthor,
    postGenre,

    //File system
    getData,
    addData

}

//!---------------------------------------------------------------------------------------------------------------------------------------

//Lettura del file
function getData(fileUrl) {
    return JSON.parse((fileSystem.readFileSync(fileUrl)).toString());
}

//Scrittura su file (o meglio, aggiunta di nuovi dati)
function addData(fileUrl, data) {
    fileSystem.writeFileSync(fileUrl, JSON.stringify(data));
}

//!---------------------------------------------------------------------------------------------------------------------------------------

//Collezioni
const vinyls = getData("./data/vinyls.json");
const authors = getData("./data/authors.json");
const genres = getData("./data/genres.json");

//Ritorna una lista di tutti i dischi
function getAllVinyls() {
    let disks = [...vinyls];

    disks.forEach((disk, index, arr) => {
        let authorName = (authors.find((author) => { return author.id == disk.author })).name;
        let genreType = (genres.find((genre) => { return genre.id == disk.genre })).type;

        arr[index] = { ...disk, author: authorName, genre: genreType };
    });

    return disks;
}

//Ritorna una lista di tutti gli autori
function getAllAuthors() {
    return authors;
}

//Ritorna una lista di tutti i generi musicali
function getAllGenres() {
    return genres;
}

//!---------------------------------------------------------------------------------------------------------------------------------------

//Ritorna le informazioni riguardo al disco richiesto (viene fornito l'id del vinile)
function getVinylInfo(diskId) {
    let disk = vinyls.find((vinyl) => { return vinyl.id === parseInt(diskId) });

    let authorName = (authors.find((author) => { return author.id === disk.author })).name;
    let genreType = (genres.find((genre) => { return genre.id === disk.genre })).type;
    disk = { ...disk, author: authorName, genre: genreType };

    return disk;
}

//Ritorna una lista di dischi di un dato autore (viene fornito l'id dell'autore)
function getAuthorVinyls(authorId) {
    let disks = [...vinyls].filter((vinyl) => { return vinyl.author === parseInt(authorId) });

    disks.forEach((disk, index, arr) => {
        let authorName = (authors.find((author) => { return author.id === disk.author })).name;
        let genreType = (genres.find((genre) => { return genre.id === disk.genre })).type;
        arr[index] = { ...disk, author: authorName, genre: genreType };
    });
    return disks;
}

//Ritorna una lista di dischi per genere (viene fornito l'id dell'genere)
function getVinylsByGenre(genreId) {
    let disks = [...vinyls].filter((vinyl) => { return vinyl.genre === parseInt(genreId) });

    disks.forEach((disk, index, arr) => {
        let authorName = (authors.find((author) => { return author.id === disk.author })).name;
        let genreType = (genres.find((genre) => { return genre.id === disk.genre })).type;
        arr[index] = { ...disk, author: authorName, genre: genreType };
    });
    return disks;
}

//!---------------------------------------------------------------------------------------------------------------------------------------

//Ritorna il nuovo id
function getNewId(arr) {
    return arr[arr.length - 1].id + 1;
}

//Ritorna l'id del valore di una collezione, passati come parametri
function getValueId(prop, val, arr) {
    const obj = arr.find((elem) => { return elem[prop] === val });
    //Se non trova delle corrispondenze, ritorna null
    if (obj === undefined) {
        return null;
    }
    return obj.id;
}

//Effettua il controllo dei dati mandati dall'utente
function checkData(arr, data, prop1, prop2) {
    return arr.find((elem) => { return elem[prop1] === data[prop2] });
}

//Aggiunge un nuovo disco
function postVinyl(data) {
    if (checkData(vinyls, data, "title", "title") === undefined) {
        let newVinyl = { id: getNewId(vinyls), ...data };

        let newAuthor = checkData(authors, data, "name", "author");
        let newGenre = checkData(genres, data, "type", "genre");

        if (newAuthor === undefined) {
            newAuthor = { id: getNewId(authors), name: data.author };
            authors.push(newAuthor);
            addData("./data/authors.json", authors);
        }
        newVinyl.author = newAuthor.id;
        if (newGenre === undefined) {
            newGenre = { id: getNewId(genres), type: data.genre };
            genres.push(newGenre);
            addData("./data/genres.json", genres);
        }
        newVinyl.genre = newGenre.id;

        vinyls.push(newVinyl);
        addData("./data/vinyls.json", vinyls);
    }
}

//Aggiunge un nuovo autore
function postAuthor(data) {
    if (checkData(authors, data, "name", "name") === undefined) {
        const newAuthor = { id: getNewId(authors), ...data };
        authors.push(newAuthor);
        addData("./data/authors.json", authors);
    }
}

//Aggiunge un nuovo genere
function postGenre(data) {
    if (checkData(genres, data, "type", "type") === undefined) {
        const newGenre = { id: getNewId(genres), ...data };
        genres.push(newGenre);
        addData("./data/genres.json", genres);
    }
}

