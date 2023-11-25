const authRouter = require('./authRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')

const handleRouters = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/categories', categoryRouter)
}

module.exports = handleRouters
