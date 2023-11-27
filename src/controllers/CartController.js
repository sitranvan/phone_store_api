const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const Product = require('../models/Product')
const ErrorResponse = require('../response/ErrorResponse')
const SuccessResponse = require('../response/SuccessResponse')

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
                throw new ErrorResponse(404, 'Không tìm thấy giỏ hàng')
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

            return new SuccessResponse(res, {
                status: 200,
                data: cartItems
            })
        } catch (error) {
            next(error)
        }
    }

    async addProductToCart(req, res, next) {
        try {
            const { id: productId } = req.params
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
                    isPaid: false
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
                throw new ErrorResponse(404, 'Không tìm thấy sản phẩm')
            }

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const cartItem = await CartItem.findOne({
                where: {
                    cartId: cart.id,
                    productId: productId
                }
            })

            if (cartItem) {
                throw new ErrorResponse(409, 'Sản phẩm đã có trong giỏ hàng')
            }

            // Thêm sản phẩm vào giỏ hàng
            const newCartItem = await CartItem.create({
                cartId: cart.id,
                productId: productId
            })

            return new SuccessResponse(res, {
                status: 201,
                data: newCartItem
            })
        } catch (error) {
            // Xử lý lỗi nếu có
            next(error)
        }
    }
}

module.exports = new CartController()
