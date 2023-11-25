const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Product = require('../models/Product')
const ErrorResponse = require('../response/ErrorResponse')
const SuccessResponse = require('../response/SuccessResponse')
class ProductController {
    async getAllProduct(req, res, next) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['name']
                    },
                    {
                        model: Brand,
                        as: 'brand',
                        attributes: ['name']
                    }
                ]
            })

            return new SuccessResponse(res, {
                status: 200,
                data: products
            })
        } catch (err) {
            next(err)
        }
    }

    async getDetailProduct(req, res, next) {
        try {
            const { id: productId } = req.params
            const product = await Product.findByPk(productId, {
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['name']
                    },
                    {
                        model: Brand,
                        as: 'brand',
                        attributes: ['name']
                    }
                ]
            })

            if (!product) {
                throw new ErrorResponse(404, 'Không tìm thấy sản phẩm')
            }

            return new SuccessResponse(res, {
                status: 200,
                data: product
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new ProductController()
