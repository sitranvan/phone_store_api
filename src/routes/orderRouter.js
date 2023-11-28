const { Router } = require('express')
const OrderController = require('../controllers/OrderController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')

const orderRouter = Router()

orderRouter.get('/', jwtAuthMiddleware, authorizedMiddleware('customer', 'owner'), OrderController.getAllOrder)
orderRouter.get('/:id', jwtAuthMiddleware, authorizedMiddleware('customer', 'owner'), OrderController.getOrderById)
orderRouter.post('/', jwtAuthMiddleware, authorizedMiddleware('customer'), OrderController.createOrder)
orderRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), OrderController.deleteOrder)
orderRouter.patch(
    '/cancel/:id',
    jwtAuthMiddleware,
    authorizedMiddleware('owner', 'customer'),
    OrderController.cancelOrderById
)
orderRouter.patch('/shipper/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), OrderController.setShipperOrder)
orderRouter.patch('/delivered/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), OrderController.setDeliveredOrder)

module.exports = orderRouter
