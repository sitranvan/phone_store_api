const { Router } = require('express')
const CouponController = require('../controllers/CouponController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const CouponSchema = require('../validations/CouponSchema')

const couponRouter = Router()

couponRouter.get('/', jwtAuthMiddleware, authorizedMiddleware('customer', 'owner'), CouponController.getAllCoupon)
couponRouter.post(
    '/',
    jwtAuthMiddleware,
    authorizedMiddleware('owner'),
    validatorMiddleware(CouponSchema.createCoupon),
    CouponController.createCoupon
)
couponRouter.patch(
    '/:id',
    jwtAuthMiddleware,
    authorizedMiddleware('owner'),
    validatorMiddleware(CouponSchema.updateCoupon),
    CouponController.updateCoupon
)

couponRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), CouponController.deleteCoupon)

module.exports = couponRouter
