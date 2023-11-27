const { Router } = require('express')
const CartController = require('../controllers/CartController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const CartSchema = require('../validations/CartSchema')

const cartRouter = Router()

cartRouter.post(
    '/',
    jwtAuthMiddleware,
    authorizedMiddleware('customer'),
    validatorMiddleware(CartSchema.addProductToCart),
    CartController.addProductToCart
)

module.exports = cartRouter
