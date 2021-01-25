const fileSystem = require('fs');

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
    let disk = vinyls.find((vinyl) => { return vinyl.id == diskId });

    let authorName = (authors.filter((author) => { return author.id == disk.author }))[0].name;
    let genreType = (genres.filter((genre) => { return genre.id == disk.genre }))[0].type;
    disk = { ...disk, author: authorName, genre: genreType };

    return disk;
}

//Ritorna una lista di dischi di un dato autore (viene fornito l'id dell'autore)
function getAuthorVinyls(authorId) {
    let disks = [...vinyls].filter((vinyl) => { return vinyl.author == authorId });

    disks.forEach((disk, index, arr) => {
        let authorName = (authors.filter((author) => { return author.id == disk.author }))[0].name;
        let genreType = (genres.filter((genre) => { return genre.id == disk.genre }))[0].type;
        arr[index] = { ...disk, author: authorName, genre: genreType };
    });
    return disks;
}

//Ritorna una lista di dischi per genere (viene fornito l'id dell'genere)
function getVinylsByGenre(genreId) {
    let disks = [...vinyls].filter((vinyl) => { return vinyl.genre == genreId });

    disks.forEach((disk, index, arr) => {
        let authorName = (authors.filter((author) => { return author.id == disk.author }))[0].name;
        let genreType = (genres.filter((genre) => { return genre.id == disk.genre }))[0].type;
        arr[index] = { ...disk, author: authorName, genre: genreType };
    });
    return disks;
}

//!---------------------------------------------------------------------------------------------------------------------------------------
