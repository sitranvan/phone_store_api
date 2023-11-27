const { Router } = require('express')
const CartController = require('../controllers/CartController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')

const cartRouter = Router()

cartRouter.post('/:id', jwtAuthMiddleware, authorizedMiddleware('customer'), CartController.addProductToCart)

module.exports = cartRouter
