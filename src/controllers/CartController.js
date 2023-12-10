const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const Product = require('../models/Product')
const ErrorResponse = require('../response/ErrorResponse')
const ApiResponse = require('../response/ApiResponse')

class CartController {
    async getCart(req, res, next) {
        try {
            const { id: userId } = req.user
            const cart = await Cart.findOne({
                where: {
                    userId,
                    isPaid: false
                }
            })

            if (!cart) {
                return ApiResponse.success(res, {
                    status: 200,
                    data: []
                })
            }

            const cartItems = await CartItem.findAll({
                where: {
                    cartId: cart.id
                },
                include: [
                    {
                        model: Product,
                        as: 'products',
                        attributes: ['id', 'name', 'description', 'photo', 'price']
                    }
                ]
            })

            return ApiResponse.success(res, {
                status: 200,
                data: cartItems
            })
        } catch (error) {
            next(error)
        }
    }

    async addProductToCart(req, res, next) {
        try {
            const { productId, quantity } = req.body
            const { id: userId } = req.user

            // Tìm giỏ hàng của người dùng chưa thanh toán
            let cart = await Cart.findOne({
                where: {
                    userId,
                    isPaid: false
                }
            })

            // Nếu không có giỏ hàng chưa thanh toán, tạo mới
            if (!cart) {
                cart = await Cart.create({
                    userId,
                    isPaid: false,
                    total: 0
                    // Thêm các trường thông tin khác cho giỏ hàng nếu cần
                })
            }

            // Tìm sản phẩm để kiểm tra sự tồn tại
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if (!product) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy sản phẩm'
                    }
                })
            }

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const cartItem = await CartItem.findOne({
                where: {
                    cartId: cart.id,
                    productId
                }
            })

            if (cartItem) {
                return ApiResponse.error(res, {
                    status: 400,
                    data: {
                        message: 'Sản phẩm đã tồn tại trong giỏ hàng'
                    }
                })
            }

            // Thêm sản phẩm vào giỏ hàng
            const newCartItem = await CartItem.create({
                cartId: cart.id,
                productId,
                quantity,
                total: quantity * (product.promotionPricce || product.price)
            })

            // Tính tổng tiền giỏ hàng
            await cart.update({
                total: cart.total + newCartItem.total
            })

            return ApiResponse.success(res, {
                status: 201,
                data: {
                    message: 'Thêm vào giỏ hàng thành công'
                }
            })
        } catch (error) {
            // Xử lý lỗi nếu có
            next(error)
        }
    }

    async deleteProductFromCart(req, res, next) {
        try {
            const { productId } = req.body
            const { id: userId } = req.user

            // Tìm giỏ hàng
            const cart = await Cart.findOne({
                where: {
                    userId,
                    isPaid: false
                }
            })

            if (!cart) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy giỏ hàng'
                    }
                })
            }

            const productInCart = await CartItem.findOne({
                where: {
                    cartId: cart.id,
                    productId
                }
            })
            if (!productInCart) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy sản phẩm trong giỏ hàng'
                    }
                })
            }
            await productInCart.destroy()

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    productInCart,
                    message: 'Xóa sản phẩm thành công'
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async updateCartItemTotalPrice(req, res, next) {
        try {
            const { id: userId } = req.user
            const { quantity, productId } = req.body
            // Tìm giỏ hàng
            const cart = await Cart.findOne({
                where: {
                    userId,
                    isPaid: false
                }
            })

            if (!cart) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy giỏ hàng'
                    }
                })
            }
            // Tìm sản phẩm để kiểm tra sự tồn tại
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if (!product) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy sản phẩm'
                    }
                })
            }
            const productInCart = await CartItem.findOne({
                where: {
                    cartId: cart.id,
                    productId
                }
            })

            if (!productInCart) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tìm thấy sản phẩm trong giỏ hàng'
                    }
                })
            }

            // Cập nhật
            productInCart.update({
                quantity,
                total: quantity * (product.promotionPricce || product.price)
            })

            await productInCart.save()

            // Tính tổng tiền giỏ hàng
            const allProductInCart = await CartItem.findAll({
                where: {
                    cartId: cart.id
                }
            })

            const totalInCart = allProductInCart.reduce((accumulator, product) => {
                return accumulator + product.total
            }, 0)

            await cart.update({
                total: totalInCart
            })

            return ApiResponse.success(res, {
                status: 200,
                data: productInCart
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CartController()
