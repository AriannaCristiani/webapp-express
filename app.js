const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public/images'))


app.get('/', (req, res) => {
    console.log('il server sta funzionando')
})


app.listen(port, () => {
    console.log(`server is running on port:${port}`)
})