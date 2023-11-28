const { Sequelize } = require('sequelize')
const Coupon = require('../models/Coupon')
const SuccessResponse = require('../response/SuccessResponse')

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
}

module.exports = new CouponController()
