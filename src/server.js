const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const handleRouters = require('./routes')
const errorMiddleware = require('./middlewares/errorMiddleware')
const { env } = require('./config/env')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

require('./models/relationship')
// Connect database
require('./database')

// Router
handleRouters(app)

// Error handlers middleware
app.use(errorMiddleware)

app.listen(env.PORT, () => {
    console.log(`Example app listening on port ${env.PORT}`)
})
