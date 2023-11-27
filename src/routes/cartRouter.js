const { Router } = require('express')
const CartController = require('../controllers/CartController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const CartSchema = require('../validations/CartSchema')

const cartRouter = Router()

cartRouter.get('/', jwtAuthMiddleware, authorizedMiddleware('customer'), CartController.getCart)
cartRouter.post(
    '/',
    jwtAuthMiddleware,
    authorizedMiddleware('customer'),
    validatorMiddleware(CartSchema.addProductToCart),
    CartController.addProductToCart
)
cartRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('customer'), CartController.deleteProductFromCart)

module.exports = cartRouter
