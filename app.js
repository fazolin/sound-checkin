const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config()

app.use(cors())

app.get('/', (req, res) => {
    res.json('You are on home')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running')
})