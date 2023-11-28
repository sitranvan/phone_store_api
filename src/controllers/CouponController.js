const { Sequelize } = require('sequelize')
const Coupon = require('../models/Coupon')
const SuccessResponse = require('../response/SuccessResponse')
const ErrorResponse = require('../response/ErrorResponse')

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

            return new SuccessResponse(res, {
                status: 200,
                data: validCoupons
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
            return new SuccessResponse(res, {
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
            return new SuccessResponse(res, {
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
            return new SuccessResponse(res, {
                status: 200,
                data: coupon
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CouponController()
