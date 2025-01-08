const express = require('express');
const pageNotFound = require('./middlewares/page-not-found');
const findError = require('./middlewares/find-error');
const moviesRouter = require('./routers/moviesRouter')
const app = express();
const port = 3000;


app.use(express.static('public/images'))


app.get('/', (req, res) => {
    res.send('il server sta funzionando')
})

app.use('/api/movies', moviesRouter)

app.use(pageNotFound)

app.use(findError)

app.listen(port, () => {
    console.log(`server is running on port:${port}`)
})