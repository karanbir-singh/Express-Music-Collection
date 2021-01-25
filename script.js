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

//Aggiunge un nuovo disco
function postVinyl(data) {
    vinyls.push(data);
    addData("./data/vinyls.json", vinyls);
}

//Aggiunge un nuovo autore
function postAuthor(data) {
    let lastId = authors[authors.length - 1].id + 1;
    data = { ...data, id: lastId };
    authors.push(data);
    addData("./data/authors.json", authors);
}

//Aggiunge un nuovo genere
function postGenre(data) {
    let lastId = authors[authors.length - 1].id + 1;
    data = { ...data, id: lastId };
    genres.push(data);
    addData("./data/genres.json", genres);
}

