const { Router } = require('express')
const CartController = require('../controllers/CartController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')

const cartRouter = Router()

cartRouter.get('/', jwtAuthMiddleware, authorizedMiddleware('customer'), CartController.getCart)
cartRouter.post('/:id', jwtAuthMiddleware, authorizedMiddleware('customer'), CartController.addProductToCart)
cartRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('customer'), CartController.deleteProductFromCart)

module.exports = cartRouter
