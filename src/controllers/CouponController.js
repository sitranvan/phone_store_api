const { Sequelize } = require('sequelize')
const Coupon = require('../models/Coupon')
const ApiResponse = require('../response/ApiResponse')
const ErrorResponse = require('../response/ErrorResponse')
const Cart = require('../models/Cart')

class CouponController {
    async getAllCoupon(req, res, next) {
        try {
            const currentDate = new Date()

            const validCoupons = await Coupon.findAll({
                where: {
                    endDate: {
                        [Sequelize.Op.gte]: currentDate // Ngày kết thúc lớn hơn hoặc bằng ngày hiện tại
                    }
                }
            })

            return new ApiResponse(res, {
                status: 200,
                data: validCoupons
            })
        } catch (err) {
            next(err)
        }
    }
    async getCoupon(req, res, next) {
        try {
            const currentDate = new Date()
            const { id: code } = req.params

            const validCoupons = await Coupon.findOne({
                where: {
                    endDate: {
                        [Sequelize.Op.gte]: currentDate // Ngày kết thúc lớn hơn hoặc bằng ngày hiện tại
                    },
                    code
                }
            })

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    coupon: validCoupons
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async createCoupon(req, res, next) {
        try {
            const { code, type, value, description } = req.body
            const existedCode = await Coupon.findOne({
                where: {
                    code
                }
            })
            if (existedCode) {
                throw new ErrorResponse(400, 'Mã khuyến mãi đã tồn tại')
            }

            // Demo mặc định 3 ngày, sẽ chỉnh lại khi dùng frontend
            const currentDate = new Date()
            const endDate = new Date(currentDate)
            endDate.setDate(currentDate.getDate() + 3)
            const newCoupon = await Coupon.create({
                code,
                type,
                value,
                description,
                startDate: new Date(),
                endDate
            })
            return new ApiResponse(res, {
                status: 201,
                data: newCoupon
            })
        } catch (err) {
            next(err)
        }
    }
    async updateCoupon(req, res, next) {
        try {
            const { id: couponId } = req.params
            const { code, type, value, description } = req.body
            const coupon = await Coupon.findOne({
                where: {
                    id: couponId
                }
            })

            if (!coupon) {
                throw new ErrorResponse(404, 'Không tìm thấy khuyến mãi')
            }

            coupon.code = code
            coupon.type = type
            coupon.value = value
            coupon.description = description
            // Ngày hết hạn ngày bắt đầu xử lý sau
            await coupon.save()
            return new ApiResponse(res, {
                status: 200,
                data: coupon
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteCoupon(req, res, next) {
        try {
            const { id: couponId } = req.params
            const coupon = await Coupon.findOne({
                where: {
                    id: couponId
                }
            })

            if (!coupon) {
                throw new ErrorResponse(404, 'Không tìm thấy khuyến mãi')
            }

            await coupon.destroy()
            return new ApiResponse(res, {
                status: 200,
                data: coupon
            })
        } catch (err) {
            next(err)
        }
    }

    async addCouponToCart(req, res, next) {
        try {
            const { codeCoupon } = req.body
            const { id: userId } = req.user
            const coupon = await Coupon.findOne({
                where: {
                    code: codeCoupon
                }
            })

            if (!coupon) {
                return ApiResponse.error(res, {
                    status: 400,
                    data: {
                        message: 'Mã khuyến mãi không hợp lệ'
                    }
                })
            }

            // Tìm ra giỏ hàng hiện tại
            const cart = await Cart.findOne({
                where: {
                    userId,
                    isPaid: false,
                    couponId: null
                }
            })
            if (!cart) {
                return ApiResponse.error(res, {
                    status: 400,
                    data: {
                        message: 'Mỗi giỏ hàng chỉ được áp dụng một mã'
                    }
                })
            }

            if (coupon.type === 'money') {
                const finalPrice = cart.total - coupon.value
                cart.total = finalPrice
                cart.couponId = coupon.id
                await cart.save()
            }

            if (coupon.type === 'percent') {
                const finalPrice = cart.total - (cart.total * coupon.value) / 100
                cart.total = finalPrice
                await cart.save()
            }
            return ApiResponse.success(res, {
                status: 200,
                data: {
                    cart,
                    message: 'Thêm mã giảm giá thành công!'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CouponController()
