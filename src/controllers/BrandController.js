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
}

module.exports = new BrandController()
