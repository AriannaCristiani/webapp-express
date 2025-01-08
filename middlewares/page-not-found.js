function pageNotFound (req, res, next) {
    console.log('pagina non trovata')

    res.status(404)
    res.json({
        error: 'Not Found',
        message: 'La pagina non è stata trovata'
    })
}


module.exports = pageNotFound