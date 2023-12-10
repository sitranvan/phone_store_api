const Category = require('../models/Category')
const ErrorResponse = require('../response/ErrorResponse')
const ApiResponse = require('../response/ApiResponse')

class CategoryController {
    async getAllCategory(req, res, next) {
        try {
            const categories = await Category.findAll()

            return new ApiResponse(res, {
                status: 200,
                data: categories
            })
        } catch (err) {
            next(err)
        }
    }

    async createCategory(req, res, next) {
        try {
            const category = await Category.create(req.body)

            return new ApiResponse(res, {
                status: 201,
                data: category
            })
        } catch (err) {
            next(err)
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { name } = req.body
            const { id } = req.params
            const category = await Category.findOne({
                where: {
                    id
                }
            })
            if (!category) {
                throw new ErrorResponse(404, 'Không tìm thấy danh mục')
            }
            category.name = name
            await category.save()

            return new ApiResponse(res, {
                status: 200,
                data: category
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params
            const category = await Category.findOne({
                where: {
                    id
                }
            })
            if (!category) {
                throw new ErrorResponse(404, 'Không tìm thấy danh mục')
            }
            await category.destroy()

            return new ApiResponse(res, {
                status: 200,
                data: category
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CategoryController()
