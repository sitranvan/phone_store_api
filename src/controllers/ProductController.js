const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Color = require('../models/Color')
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

    async createProduct(req, res, next) {
        try {
            const { name, description, specification, price, categoryId, brandId, colors } = req.body

            let photo = ''
            if (req.file) {
                photo = req.file.filename
            }

            const product = await Product.create({
                name,
                description,
                specification,
                photo,
                price,
                categoryId,
                brandId
            })
            // Thêm mảng màu vào bảng Color
            if (colors && colors.length > 0) {
                const colorPromises = colors.map((color) => {
                    return Color.create({
                        productId: product.id,
                        name: color
                    })
                })

                // Chờ cho tất cả các promise hoàn thành
                await Promise.all(colorPromises)
            }

            return new SuccessResponse(res, {
                status: 201,
                data: product
            })
        } catch (err) {
            next(err)
        }
    }
    async updateProduct(req, res, next) {
        try {
            const { name, description, specification, price, categoryId, brandId, colors } = req.body
            const { id: productId } = req.params
            const product = await Product.findByPk(productId)

            if (!product) {
                throw new ErrorResponse(404, 'Không tìm thấy sản phẩm')
            }
            let photo = ''
            if (req.file) {
                photo = req.file.filename
            }

            await product.update({
                name,
                description,
                specification,
                photo,
                price,
                categoryId,
                brandId
            })

            await Color.destroy({
                where: {
                    productId: productId
                }
            })

            // Sau đó, thêm mới các màu từ mảng mới
            if (colors && colors.length > 0) {
                const colorPromises = colors.map((color) => {
                    return Color.create({
                        productId: productId,
                        name: color
                    })
                })

                // Chờ cho tất cả các promise hoàn thành
                await Promise.all(colorPromises)
            }
            return new SuccessResponse(res, {
                status: 200,
                data: product
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id: productId } = req.params
            const product = await Product.findByPk(productId)

            if (!product) {
                throw new ErrorResponse(404, 'Không tìm thấy sản phẩm')
            }

            await product.destroy()

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
