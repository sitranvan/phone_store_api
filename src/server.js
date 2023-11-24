const express = require('express')
const env = require('./config/env')
const morgan = require('morgan')
const handleRouters = require('./routes')
const errorMiddleware = require('./middlewares/errorMiddleware')
const app = express()

app.use(express.json())
app.use(morgan('dev'))

// Connect database
require('./database')

// Router
handleRouters(app)

// Error handlers middleware
app.use(errorMiddleware)

app.listen(env.PORT, () => {
    console.log(`Example app listening on port ${env.PORT}`)
})
