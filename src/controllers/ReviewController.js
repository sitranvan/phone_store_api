const Review = require('../models/Review')
const ErrorResponse = require('../response/ErrorResponse')
const SuccessResponse = require('../response/SuccessResponse')

class ReviewController {
    async getAllReview(req, res, next) {
        try {
            const reviews = await Review.findAll({
                where: {
                    isHidden: false
                }
            })

            return new SuccessResponse(res, {
                status: 200,
                data: reviews
            })
        } catch (err) {
            next(err)
        }
    }

    async getAllReviewProduct(req, res, next) {
        try {
            const { id: productId } = req.params
            const reviews = await Review.findAll({
                where: { productId, isHidden: false }
            })
            if (reviews.length <= 0) {
                throw new ErrorResponse(404, 'Chưa có lượt đánh giá nào')
            }
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

    async updateReview(req, res, next) {
        try {
            const { id: reviewId } = req.params
            const { comment, rating } = req.body

            const review = await Review.findOne({
                where: { id: reviewId }
            })

            if (!review) {
                throw new ErrorResponse(404, 'Không tìm thấy đánh giá')
            }
            review.comment = comment
            review.rating = rating

            await review.save()
            return new SuccessResponse(res, {
                status: 200,
                data: review
            })
        } catch (err) {
            next(err)
        }
    }

    async hiddenReview(req, res, next) {
        try {
            const { id: reviewId } = req.params

            const review = await Review.findOne({
                where: { id: reviewId }
            })

            if (!review) {
                throw new ErrorResponse(404, 'Không tìm thấy đánh giá')
            }
            review.isHidden = true

            await review.save()
            return new SuccessResponse(res, {
                status: 200,
                data: review
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteReview(req, res, next) {
        try {
            const { id: reviewId } = req.params

            const review = await Review.findOne({
                where: { id: reviewId }
            })

            if (!review) {
                throw new ErrorResponse(404, 'Không tìm thấy đánh giá')
            }
            await review.destroy()
            return new SuccessResponse(res, {
                status: 200,
                data: review
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new ReviewController()
