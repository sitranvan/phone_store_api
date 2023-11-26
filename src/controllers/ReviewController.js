const Review = require('../models/Review')
const SuccessResponse = require('../response/SuccessResponse')

class ReviewController {
    async getAllReview(req, res) {
        try {
            const { id: productId } = req.params
            const reviews = await Review.findAll()

            return new SuccessResponse(res, {
                status: 200,
                data: reviews
            })
        } catch (err) {
            next(err)
        }
    }

    async createReview(req, res, next) {
        try {
            const { id: userId } = req.user
            const { comment, rating, productId } = req.body

            const review = await Review.create({
                comment,
                rating,
                productId,
                userId
            })

            return new SuccessResponse(res, {
                status: 201,
                data: review
            })
        } catch (err) {
            next(err)
        }
    }

    async hiddenReview(req, res) {}

    async deleteReview(req, res) {}
}

module.exports = new ReviewController()
