const Brand = require('../models/Brand')
const ErrorResponse = require('../response/ErrorResponse')
const ApiResponse = require('../response/ApiResponse')

class BrandController {
    async getAllBrand(req, res, next) {
        try {
            const brands = await Brand.findAll({
                order: [['createdAt', 'DESC']]
            })

            return ApiResponse.success(res, {
                status: 200,
                data: brands
            })
        } catch (err) {
            next(err)
        }
    }
    async getBrand(req, res, next) {
        try {
            const { id } = req.params
            const brand = await Brand.findByPk(id)
            if (!brand) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy'
                    }
                })
            }
            return ApiResponse.success(res, {
                status: 200,
                data: brand
            })
        } catch (err) {
            next(err)
        }
    }
    async createBrand(req, res, next) {
        try {
            const brand = await Brand.create(req.body)

            return ApiResponse.success(res, {
                status: 201,
                data: {
                    brand,
                    message: 'Thêm thương hiệu thành công'
                }
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
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        brand,
                        message: 'Không tìm thấy thương hiệu'
                    }
                })
            }
            brand.name = name
            await brand.save()

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    brand,
                    message: 'Cập nhật thương hiệu thành công'
                }
            })
        } catch (err) {
            next(err)
        }
    }
    async deleteBrand(req, res, next) {
        try {
            const { id } = req.params
            const brand = await Brand.findOne({
                where: {
                    id
                }
            })
            if (!brand) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy thương hiệu'
                    }
                })
            }
            await brand.destroy()

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    brand,
                    message: 'Xóa thương hiệu thành công'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new BrandController()
