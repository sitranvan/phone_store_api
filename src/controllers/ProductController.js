const { Op, Sequelize } = require('sequelize')
const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Color = require('../models/Color')
const Product = require('../models/Product')
const ApiResponse = require('../response/ApiResponse')
const Review = require('../models/Review')
const TotalStar = require('../models/TotalStar')
const ProductImages = require('../models/ProductImages')
class ProductController {
    async getAllProduct(req, res, next) {
        try {
            // Destructure các tham số từ query string
            const {
                page = 1,
                limit = 15,
                order = 'desc',
                sort_by = 'createdAt',
                category,
                brand,
                price_max,
                price_min,
                name,
                rating
            } = req.query

            // Xây dựng điều kiện cho truy vấn
            const whereCondition = {}

            if (category) {
                whereCondition.categoryId = category
            }

            if (brand) {
                whereCondition.brandId = brand
            }

            if (price_max && price_min) {
                // Use compound condition for price range
                whereCondition.price = {
                    [Op.between]: [price_min, price_max]
                }
            } else {
                // Use separate conditions for min and max prices if only one is provided
                if (price_max) {
                    whereCondition.price = { [Op.lte]: price_max }
                }

                if (price_min) {
                    whereCondition.price = { [Op.gte]: price_min }
                }
            }

            if (name) {
                whereCondition.name = { [Op.like]: `%${name}%` }
            }

            // Sắp xếp theo trường được chọn và thứ tự được chỉ định
            const orderArray = [[sort_by, order]]

            // Thực hiện truy vấn sử dụng các điều kiện và tham số
            let products

            if (rating) {
                // Thêm điều kiện lọc sản phẩm theo rating trong total_star
                const ratingCondition = {
                    total_star: { [Op.gte]: rating }
                }

                products = await Product.findAll({
                    where: whereCondition,
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
                        },
                        {
                            model: TotalStar,
                            as: 'total_star',
                            attributes: ['total_star', 'total_reviewer'],
                            where: ratingCondition
                        }
                    ],
                    order: orderArray,
                    offset: (page - 1) * limit,
                    limit: parseInt(limit)
                })
            } else {
                // If no rating is specified, include TotalStar without any additional condition
                products = await Product.findAll({
                    where: whereCondition,
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
                        },
                        {
                            model: TotalStar,
                            as: 'total_star',
                            attributes: ['total_star', 'total_reviewer']
                        }
                    ],
                    order: orderArray,
                    offset: (page - 1) * limit,
                    limit: parseInt(limit)
                })
            }

            // Đếm tổng số sản phẩm để tính số trang
            const totalCount = await Product.count({
                where: whereCondition
            })

            // Tính toán số trang và kích thước trang
            const page_size = Math.ceil(totalCount / limit)

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    products,
                    pagination: { page, limit: parseInt(limit), page_size }
                }
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
                    },
                    {
                        model: TotalStar,
                        as: 'total_star',
                        attributes: ['total_star', 'total_reviewer']
                    },
                    {
                        model: ProductImages,
                        as: 'images',
                        attributes: ['url']
                    }
                ]
            })

            if (!product) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy sản phẩm'
                    }
                })
            }

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    product
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async createProduct(req, res, next) {
        try {
            const { name, description, price, promotionPrice, categoryId, brandId } = req.body

            if (promotionPrice > price) {
                return ApiResponse.error(res, {
                    status: 400,
                    data: {
                        promotionPrice: 'Giá khuyến mãi phải thấp hơn giá gốc'
                    }
                })
            }

            let photo = ''
            if (req.file) {
                photo = req.file.filename
            }

            const product = await Product.create({
                name,
                description,
                photo,
                price,
                promotionPrice,
                categoryId,
                brandId
            })
            // Thêm mảng màu vào bảng Color
            // if (colors && colors.length > 0) {
            //     const colorPromises = colors.map((color) => {
            //         return Color.create({
            //             productId: product.id,
            //             name: color
            //         })
            //     })

            //     // Chờ cho tất cả các promise hoàn thành
            //     await Promise.all(colorPromises)
            // }

            return ApiResponse.success(res, {
                status: 201,
                data: {
                    product,
                    message: 'Thêm sản phẩm thành công'
                }
            })
        } catch (err) {
            next(err)
        }
    }
    async updateProduct(req, res, next) {
        try {
            const { name, description, specification, price, categoryId, brandId, promotionPrice } = req.body
            const { id: productId } = req.params
            const product = await Product.findByPk(productId)

            if (!product) {
                return ApiResponse.success(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy sản phẩm'
                    }
                })
            }
            let photo = ''
            if (req.file) {
                photo = req.file.filename
                product.photo = photo
            }

            product.name = name
            product.description = description
            product.specification = specification
            product.price = price
            product.categoryId = categoryId
            product.brandId = brandId
            product.promotionPrice = promotionPrice
            await product.save()
            // await Color.destroy({
            //     where: {
            //         productId: productId
            //     }
            // })

            // Sau đó, thêm mới các màu từ mảng mới
            // if (colors && colors.length > 0) {
            //     const colorPromises = colors.map((color) => {
            //         return Color.create({
            //             productId: productId,
            //             name: color
            //         })
            //     })

            //     // Chờ cho tất cả các promise hoàn thành
            //     await Promise.all(colorPromises)
            // }
            return ApiResponse.success(res, {
                status: 200,
                data: {
                    product,
                    message: 'Cập nhật sản phẩm thành công'
                }
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
                return ApiResponse.success(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy sản phẩm'
                    }
                })
            }

            await product.destroy()

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    product,
                    message: 'Xóa sản phẩm thành công'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new ProductController()
