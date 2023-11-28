const { Router } = require('express')
const CouponController = require('../controllers/CouponController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')

const couponRouter = Router()

couponRouter.get('/', jwtAuthMiddleware, authorizedMiddleware('customer', 'owner'), CouponController.getAllCoupon)

module.exports = couponRouter
