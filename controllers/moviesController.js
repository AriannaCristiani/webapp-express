const connection = require('../data/db.js');

function index(req, res) {
    // res.json({
    //     message: 'moviesIndex'
    // })

    const sql = `SELECT * FROM movies`;

    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ message: err.message })

        res.json(movies)
    })
}


function show(req, res) {
    res.json({
        message: 'moviesShow'
    })
}


module.exports = { index, show }