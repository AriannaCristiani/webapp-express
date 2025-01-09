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

    const sql = `SELECT * FROM movies WHERE id=?`;

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        if (result.length === 0) return res.status(404).json({
            error: 'not found',
            message: 'movie not found'
        });

        const movie = result[0];

        res.json(movie)
    })
};


module.exports = { index, show }