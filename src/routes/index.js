const authRouter = require('./authRouter')
const userRouter = require('./userRouter')

const handleRouters = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/users', userRouter)
}

module.exports = handleRouters
