# Operazioni

- `(root)/` : ritorna un oggetto json con esempi di possibili route a cui il server risponde. (swagger)

* definire le collezioni
* definire le relazioni tra elementi delle collezioni

## Problema

Gestione collezione di dischi in vinile.

## Definisco le collezioni

### Entità
- disco
- autore
- genere

## Definisco le relazioni

- disco > autore
- disco > genere
- genere > dischi
- autore > dischi

## REST
Primo approccio per ragionare in termini di collection e risorse utilizzando i verbi HTTP.

##### Una richiesta rest e' fatta in questo modo:

VERBO HTTP -> cosa fare:

- **`GET`**: lettura
- **`POST`** (su collection): creazione di un nuovo elemento
- **`PUT`** (su un elemento di una collection): modifica di un elemento esistente
- **`DELETE`** (su un elemento di una collection): elimina elemento esistente 

**`URI`**: su cosa fare l'operazione

**`BODY`**: informazioni per eseguire la richieste scritte in JSON

## Query (API del web service)

### API pubblica

- elenco di tutti i dischi: `GET /vinyls`
- elenco degli autori: `GET /authors/`
- elenco dei generi: `GET /genres`
- recuperare informazioni su un disco: `GET /vinyls/:id` 
- recuperare tutti i dischi di un autore: `GET /authors/:authorID/vinyls`
- recuperare i dischi di un genere: `GET /genres/:id/vinyls` 

### API privata

- creare un nuovo vinile: `POST /vinyls`
- creare un nuovo autore: `POST /authors`
- creare un nuovo genere: `POST /genres`