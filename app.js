const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const postRoute = require('./routes/post');

//Middleware
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'));
app.use('/', postRoute);

// app.get('/', (req, res) => {
//     res.json('You are on home')
// })

// Mongo Atlas Connection 
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        if (mongoose.connection.readyState) {
            console.log('Conected to DB!')
        }
    })

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running')
})