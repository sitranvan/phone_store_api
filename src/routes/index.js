const authRouter = require('./authRouter')
const brandRouter = require('./brandRouter')
const cartRouter = require('./cartRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const reviewRouter = require('./reviewRouter')
const userRouter = require('./userRouter')

const handleRouters = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/categories', categoryRouter)
    app.use('/api/v1/brands', brandRouter)
    app.use('/api/v1/products', productRouter)
    app.use('/api/v1/reviews', reviewRouter)
    app.use('/api/v1/carts', cartRouter)
}

module.exports = handleRouters
