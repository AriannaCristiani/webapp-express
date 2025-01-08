function findError (err, req, res, next) {
    console.log('errore di prova')
    
    res.status(500);
    res.json({message: err.message})
}



module.exports = findError