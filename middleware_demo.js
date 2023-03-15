const express = require('express')

const app = express();
app.use(logger)

app.get('/', (req, res) => {
    console.log('Home page')
    res.send('Home page')
})

app.get('/users', auth, (req, res) => {
    console.log(`is user authenticated : ${req.admin}`)
    console.log('User page')
    res.send('Users page')
})

// custom middleware to print current url
function logger(req, res, next){
    // console.log(`The current url is : ${req.originalUrl}`)
    next()
}

// custom built middleware
function auth(req, res, next){
    console.log('auth...')
    if (req.query.admin === 'true'){
        req.admin = true
        next()
    }else{
        res.send('no auth...')
    }
}

app.listen(8000, () => {
    console.debug('App listening on :8000');
});
