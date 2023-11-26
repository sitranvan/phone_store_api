const { Router } = require('express')
const ReviewController = require('../controllers/ReviewController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const ReviewSchema = require('../validations/ReviewSchema')

const reviewRouter = Router()

reviewRouter.get('/', jwtAuthMiddleware, authorizedMiddleware('owner'), ReviewController.getAllReview)
reviewRouter.post(
    '/',
    jwtAuthMiddleware,
    validatorMiddleware(ReviewSchema.createReview),
    authorizedMiddleware('customer'),
    ReviewController.createReview
)

module.exports = reviewRouter
