const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const homeHandler = require('./api/routes/home')
const signupHandler = require('./api/routes/signup')
const loginHandler = require('./api/routes/login')

mongoose.connect('mongodb+srv://Nandni:nandu6239@cluster0.ok9o9jh.mongodb.net/youtube-DB?retryWrites=true&w=majority')
    .then(console.log('Connected Successfully'))
    .catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/', homeHandler)
app.use('/youtube/signup', signupHandler)
app.use('/youtube/login', loginHandler)

app.use((req, res) => {
    res.status(404).json({message: 'Resource Not Found'})
})

module.exports = app;