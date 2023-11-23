const express = require('express')
const env = require('./configs/env')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(env.PORT, () => {
    console.log(`Example app listening on port ${env.PORT}`)
})
