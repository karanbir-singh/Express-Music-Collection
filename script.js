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

//Effettua il controllo dei dati mandati dall'utente per aggiungere un nuovo disco
function formatPostVinylData(prop1, prop2, value, newVinyl, arr) {
    if (value === null) {
        //Se value e' null, allora creo un nuovo autore o genre nuovo con un nuovo id
        const newObj = { id: getNewId(arr) }

        //e alla proprieta' prop1 assegno il valore della proprieta' prop2 di newVinyl
        /*  Esempio:
            newVinyl = { id: "valore", title: "titolo", 
                            author: "author nuovo", genre: "genere nuovo" }
            Per autore o genere nuovo sin intende che non e' presente nel file json
            Se prop1 = "name" -> prop2 = "author"
            Se prop1 = "type" -> prop2 = "genre"
         */
        newObj[prop1] = newVinyl[prop2];

        //Update dell'array e salvataggio su file
        arr.push(newObj);
        addData(`./data/${prop2}s.json`, arr);

        //Infine si associa alla proprieta' prop2 di newVinyl l'id del nuovo autore o genere
        newVinyl[prop2] = newObj.id;
        return newVinyl;
    }

    //Nel caso in cui value non e' null, allora l'autore o il genere esistono gia' in precedenza
    //e quindi basta settare alla proprieta' prop2 di newVinyl l'id dell' autore o genere
    //ovvero value
    newVinyl[prop2] = value;
    return newVinyl;
}

//Aggiunge un nuovo disco
function postVinyl(data) {
    let newVinyl = { id: getNewId(vinyls), ...data };

    const authorId = getValueId("name", newVinyl.author, authors);
    const genreId = getValueId("type", newVinyl.genre, genres);

    newVinyl = formatPostVinylData("name", "author", authorId, newVinyl, authors);
    newVinyl = formatPostVinylData("type", "genre", genreId, newVinyl, genres);

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

