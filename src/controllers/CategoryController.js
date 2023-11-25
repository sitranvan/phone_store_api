const Category = require('../models/Category')
const SuccessResponse = require('../response/SuccessResponse')

class CategoryController {
    async getAllCategory(req, res, next) {
        try {
            const categories = await Category.findAll()

            return new SuccessResponse(res, {
                status: 200,
                data: categories
            })
        } catch (err) {
            next(err)
        }
    }

    async createCategory(req, res, next) {
        try {
            await Category.create(req.body)

            return new SuccessResponse(res, {
                status: 201,
                message: 'Tạo danh mục thành công'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CategoryController()
