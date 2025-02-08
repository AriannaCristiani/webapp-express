const express = require('express');
const pageNotFound = require('./middlewares/page-not-found');
const findError = require('./middlewares/find-error');
const moviesRouter = require('./routers/moviesRouter')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 3000;


//console.log(process.env)

app.use(cors());

app.use(fileUpload());

app.use(express.json())

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.send('il server sta funzionando')
})

app.use('/api/movies', moviesRouter)

app.use(pageNotFound)

app.use(findError)

app.listen(port, () => {
    console.log(`server is running on port:${port}`)
})