const Order = require('../models/Order')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const SuccessResponse = require('../response/SuccessResponse')
const OrderItem = require('../models/OrderItem')
const ErrorResponse = require('../response/ErrorResponse')
class OrderController {
    async getAllOrder(req, res, next) {
        try {
            const { id: userId, role } = req.user
            let orders = []
            if (role === 'customer') {
                orders = await Order.findAll({
                    where: { userId },
                    include: [
                        {
                            model: Product,
                            as: 'products',
                            through: {
                                model: OrderItem,
                                as: 'ordersItem' // Đặt tên alias cho OrderItem trong kết quả trả về
                            }
                        }
                    ]
                })
            }
            if (role === 'owner') {
                orders = await Order.findAll({
                    include: [
                        {
                            model: Product,
                            as: 'products'
                        }
                    ]
                })
            }

            return new SuccessResponse(res, {
                status: 200,
                data: orders
            })
        } catch (error) {
            next(error)
        }
    }

    async getOrderById(req, res, next) {
        try {
            const { id: userId } = req.user
            const { id: orderId } = req.params
            const order = await Order.findByPk(orderId, {
                where: {
                    id: orderId,
                    userId
                },
                include: [
                    {
                        model: Product,
                        as: 'products',
                        through: {
                            model: OrderItem,
                            as: 'ordersItem' // Đặt tên alias cho OrderItem trong kết quả trả về
                        }
                    }
                ]
            })

            if (!order) {
                throw new ErrorResponse(404, 'Không tìm thấy đơn hàng')
            }

            return new SuccessResponse(res, {
                status: 200,
                data: order
            })
        } catch (error) {
            next(error)
        }
    }

    async createOrder(req, res, next) {
        try {
            const { id: userId } = req.user
            const { note } = req.body
            const cart = await Cart.findOne({
                where: { userId, isPaid: false },
                include: [
                    {
                        model: CartItem,
                        as: 'cartItems'
                    }
                ]
            })

            if (!cart) {
                throw new ErrorResponse(404, 'Bạn chưa có sản phẩm nào trong giỏ hàng')
            }
            // Lấy ra sản phẩm trong giỏ hàng
            const cartItems = cart.cartItems

            // Tạo đơn hàng
            const order = await Order.create({
                note,
                userId
            })

            await Promise.all(
                cartItems.map(async (item) => {
                    await OrderItem.create({
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        total: item.total
                    })
                })
            )

            await cart.update({ isPaid: true })

            return new SuccessResponse(res, {
                status: 200,
                data: order
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new OrderController()
