const fileSystem = require('fs');
const { get } = require('http');

module.exports = {
    //GET Tutte le info
    getAllVinyls,
    getAllAuthors,
    getAllGenres,

    //GET Info specifiche
    getVinylInfo,
    getAuthorVinyls,
    getVinylsByGenre,

    //POST dati

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
    fileSystem.appendFileSync(fileUrl, JSON.stringify(data));
}

//!---------------------------------------------------------------------------------------------------------------------------------------

//Collezioni
const vinyls = getData("./data/vinyls.json");
const authors = getData("./data/authors.json");
const genres = getData("./data/genres.json");

//Ritorna una lista di tutti i dischi
function getAllVinyls() {
    vinyls.forEach(vinyl => {
        vinyl.author = (authors.filter((author) => { return author.id == vinyl.author }))[0].name;
        vinyl.genre= (genres.filter((genre) => { return genre.id == vinyl.genre }))[0].type;
    });

    return vinyls;
}

//Ritorna una lista di tutti gli autori
function getAllAuthors(data) {
    return data.map((disk) => { return disk.author.name });
}

//Ritorna una lista di tutti i generi musicali
function getAllGenres(data) {
    return data.map((disk) => { return disk.genre.type });
}

//!---------------------------------------------------------------------------------------------------------------------------------------

//Ritorna le informazioni riguardo al disco richiesto (viene fornito l'id del vinile)
function getVinylInfo(data, diskId) {
    return data.filter((disk) => { return disk.diskId == diskId; });
}

//Ritorna una lista di dischi di un dato autore (viene fornito l'id dell'autore)
function getAuthorVinyls(data, authorId) {
    return (data.filter((disk) => { return disk.author.id == authorId; })).map((x) => { return x.title });
}

//Ritorna una lista di dischi per genere (viene fornito l'id dell'genere)
function getVinylsByGenre(data, genreId) {
    return (data.filter((disk) => { return disk.genre.id == genreId; })).map((x) => { return x.title });
}

//!---------------------------------------------------------------------------------------------------------------------------------------
