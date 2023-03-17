const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))

// morgan.token('type', (req, res) => {
//     return req.headers['content-type']
// })

// app.use(morgan(':method :url :status :date[web] :type'))

// morgan response template = morgan(headers)
// morgan(':method :url :status :res[content-length] - :response-time ms')

app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.listen(8000, () => {
    console.log('App listening on :8000');
});