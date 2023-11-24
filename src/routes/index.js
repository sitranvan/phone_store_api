const authRouter = require('./authRouter')

const handleRouters = (app) => {
    app.use('/api/v1/auth', authRouter)
}

module.exports = handleRouters
