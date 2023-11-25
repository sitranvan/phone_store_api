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

    async updateBrand(req, res, next) {
        try {
            const { name } = req.body
            const { id } = req.params
            const brand = await Brand.findOne({
                where: {
                    id
                }
            })
            if (!brand) {
                throw new ErrorResponse(404, 'Không tìm thấy thương hiệu')
            }
            brand.name = name
            await brand.save()

            return new SuccessResponse(res, {
                status: 200,
                message: 'Cập nhật thương hiệu thành công'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new BrandController()
