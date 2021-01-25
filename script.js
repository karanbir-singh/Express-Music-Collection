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
        let authorName = (authors.filter((author) => { return author.id == disk.author }))[0].name;
        let genreType = (genres.filter((genre) => { return genre.id == disk.genre }))[0].type;
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

    let authorName = (authors.filter((author) => { return author.id === disk.author }))[0].name;
    let genreType = (genres.filter((genre) => { return genre.id === disk.genre }))[0].type;
    disk = { ...disk, author: authorName, genre: genreType };

    return disk;
}

//Ritorna una lista di dischi di un dato autore (viene fornito l'id dell'autore)
function getAuthorVinyls(authorId) {
    let disks = [...vinyls].filter((vinyl) => { return vinyl.author === parseInt(authorId) });

    disks.forEach((disk, index, arr) => {
        let authorName = (authors.filter((author) => { return author.id === disk.author }))[0].name;
        let genreType = (genres.filter((genre) => { return genre.id === disk.genre }))[0].type;
        arr[index] = { ...disk, author: authorName, genre: genreType };
    });
    return disks;
}

//Ritorna una lista di dischi per genere (viene fornito l'id dell'genere)
function getVinylsByGenre(genreId) {
    let disks = [...vinyls].filter((vinyl) => { return vinyl.genre === parseInt(genreId) });

    disks.forEach((disk, index, arr) => {
        let authorName = (authors.filter((author) => { return author.id === disk.author }))[0].name;
        let genreType = (genres.filter((genre) => { return genre.id === disk.genre }))[0].type;
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

//Effettua il controllo dei dati mandati dall'utente per aggiungere un nuovo disco
function formatPostVinylData(){
    //TODO spostare e generalizzare i controlli effettuati nella funzione postVinyl()
}

//Aggiunge un nuovo disco
function postVinyl(data) {
    const newVinyl = { id: getNewId(vinyls), ...data };

    const authorId = getValueId("name", newVinyl.author, authors);
    const genreId = getValueId("type", newVinyl.genre, genres);

    if (authorId !== null) {
        newVinyl.author = authorId;
    } else {
        const newAuthor = { id: getNewId(authors), "name": newVinyl.author }
        authors.push(newAuthor);
        addData("./data/authors.json", authors);

        newVinyl.author = newAuthor.id;
    }

    if (genreId !== null) {
        newVinyl.genre = genreId;
    } else {
        const newGenre = { id: getNewId(genres), "type": newVinyl.genre };
        genres.push(newGenre);
        addData("./data/genres.json", genres);

        newVinyl.genre = newGenre.id;
    }

    vinyls.push(newVinyl);
    addData("./data/vinyls.json", vinyls);
}

//Aggiunge un nuovo autore
function postAuthor(data) {
    const newAuthor = { id: getNewId(authors), ...data };
    authors.push(newAuthor);
    addData("./data/authors.json", authors);
}

//Aggiunge un nuovo genere
function postGenre(data) {
    const newGenre = { id: getNewId(genres), ...data };
    genres.push(genre);
    addData("./data/genres.json", genres);
}

