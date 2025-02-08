const connection = require('../data/db.js');



//ROTTA INDEX:

function index(req, res) {

    const sql = `SELECT * FROM movies`;

    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ message: err.message })

        movies.forEach((movie) => {
            movie.image = `http://localhost:3000/img/${movie.image}`
        })

        res.json(movies)
    })
};



//ROTTA SHOW:

function show(req, res) {

    const id = parseInt(req.params.id);

    const sql = `SELECT movies.*, AVG(vote) AS avg_vote 
		FROM movies
		JOIN reviews
		ON movies.id = reviews.movie_id 
		WHERE movies.id = ?
		GROUP BY movies.id
		`

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        if (result.length === 0) return res.status(404).json({
            error: 'not found',
            message: 'movie not found'
        });

        const movie = result[0];
        movie.image = `http://localhost:3000/img/${movie.image}`

        const sql = `SELECT * FROM reviews WHERE movie_id = ?`

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            movie.reviews = results

            res.json(movie)
        })
    })
}


//ROTTA STORE REVIEWS

function storeReviews(req, res) {

    const id = req.params.id

    const { text, vote, name } = req.body
    //console.log(id, text, vote, name)


    if (!name || name?.length > 255 || typeof name !== 'string') {
        return res.status(400).json({ message: 'I dati non sono validi' })
    }


    const sql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    connection.query(sql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Query del database fallita' })
        //console.log(results)
        res.status(201).json({ message: 'Recensione aggiunta', id: results.insertId })
    })
}



// ROTTA STORE FILMS

const path = require('path');
const fs = require('fs');

function storeFilms(req, res) {
    console.log(" Ricevuto body:", req.body);
    console.log(" File ricevuti:", req.files);

    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: 'Nessun file caricato' });
    }

    const { title, director, genre, release_year, abstract } = req.body;

    if (!title || !director || !genre || !release_year || !abstract) {
        return res.status(400).json({ message: 'Tutti i campi devono essere compilati' });
    }

    const imageFile = req.files.image;
    const formattedImageName = Date.now() + '-' + imageFile.name.replace(/ /g, "-");

    const uploadsPath = path.join(__dirname, '..', 'public', 'img');
    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
    }

    const imgFinalPath = path.join(uploadsPath, formattedImageName);

    imageFile.mv(imgFinalPath, (err) => {
        if (err) {
            return res.status(500).json({ error: `Errore durante il salvataggio dell'immagine` });
        }

        const sql = 'INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [title, director, genre, Number(release_year), abstract, formattedImageName], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Errore durante l’inserimento nel database' });
            }
            res.status(201).json({ message: 'Film aggiunto con successo' });
        });
    });
}


module.exports = { index, show, storeReviews, storeFilms }