const connection = require('../data/db.js');

function index(req, res) {
    res.json({
        message: 'moviesIndex'
    })
}


function show(req, res) {
    res.json({
        message: 'moviesShow'
    })
}


module.exports = { index, show }