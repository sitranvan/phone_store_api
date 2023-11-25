const authRouter = require('./authRouter')
const brandRouter = require('./brandRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')

const handleRouters = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/categories', categoryRouter)
    app.use('/api/v1/brands', brandRouter)
}

module.exports = handleRouters
