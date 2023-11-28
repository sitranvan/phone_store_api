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
            const { id: userId, role } = req.user
            const { id: orderId } = req.params

            let order = []
            if (role === 'customer') {
                order = await Order.findOne({
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
            }

            if (role === 'owner') {
                order = await Order.findOne({
                    where: {
                        id: orderId
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
            }

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

    async deleteOrder(req, res, next) {
        try {
            const { id: orderId } = req.params

            const orderItem = await OrderItem.destroy({
                where: {
                    orderId
                }
            })

            if (!orderItem) {
                throw new ErrorResponse(404, 'Không tìm thấy sản phẩm trong đơn hàng')
            }

            const order = await Order.destroy({
                where: {
                    id: orderId
                }
            })
            if (!order) {
                throw new ErrorResponse(404, 'Không tìm thấy đơn hàng')
            }

            return new SuccessResponse(res, {
                status: 200,
                message: 'Xóa đơn hàng thành công'
            })
        } catch (err) {
            next(err)
        }
    }

    async cancelOrderById(req, res, next) {
        try {
            const { id: userId, role } = req.user
            const { id: orderId } = req.params
            const { canceledReason } = req.body

            const order = await Order.findOne({
                where: {
                    id: orderId
                }
            })

            if (!order) {
                throw new ErrorResponse(404, 'Không tìm thấy đơn hàng')
            }

            if (!['pending'].includes(order.status)) {
                throw new ErrorResponse(403, 'Bạn không thể hủy đơn hàng này')
            }

            if (role === 'customer' && userId !== order.userId) {
                throw new ErrorResponse(403, 'Bạn không có quyền hủy đơn hàng của người khác')
            }
            order.status = 'cancelled'
            order.canceledReason = canceledReason
            order.cancelledAt = new Date()
            order.cancelledBy = userId
            await order.save()

            return new SuccessResponse(res, {
                status: 200,
                message: 'Hủy đơn hàng thành công'
            })
        } catch (err) {
            next(err)
        }
    }

    async setShipperOrder(req, res, next) {
        const { id: orderId } = req.params

        const order = await Order.findOne({
            where: {
                id: orderId
            }
        })
        if (!order) {
            throw new ErrorResponse(404, 'Không tìm thấy đơn hàng')
        }
        order.status = 'shipped'
        await order.save()
        return new SuccessResponse(res, {
            status: 200,
            data: order
        })
    }
    async setDeliveredOrder(req, res, next) {
        const { id: orderId } = req.params

        const order = await Order.findOne({
            where: {
                id: orderId
            }
        })
        if (!order) {
            throw new ErrorResponse(404, 'Không tìm thấy đơn hàng')
        }
        order.status = 'delivered'
        order.deliveredAt = new Date()
        await order.save()
        return new SuccessResponse(res, {
            status: 200,
            data: order
        })
    }
}

module.exports = new OrderController()