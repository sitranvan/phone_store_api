const Brand = require('../models/Brand')
const ErrorResponse = require('../response/ErrorResponse')
const SuccessResponse = require('../response/SuccessResponse')

class BrandController {
    async getAllBrand(req, res, next) {
        try {
            const brands = await Brand.findAll()

            return new SuccessResponse(res, {
                status: 200,
                data: brands
            })
        } catch (err) {
            next(err)
        }
    }

    async createBrand(req, res, next) {
        try {
            await Brand.create(req.body)

            return new SuccessResponse(res, {
                status: 201,
                message: 'Tạo thương hiệu thành công'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new BrandController()
