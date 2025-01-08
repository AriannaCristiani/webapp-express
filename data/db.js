const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nina8097',
    database: 'movies_db',
})

connection.connect((err) => {
    if (err) throw err

    console.log('Connect to MYSQL')
})

module.exports = connection