const Order = require('../models/Order')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const ApiResponse = require('../response/ApiResponse')
const OrderItem = require('../models/OrderItem')
const ErrorResponse = require('../response/ErrorResponse')
const User = require('../models/User')
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
                        },
                        {
                            model: User, // Tham chiếu đến mô hình User
                            attributes: ['id', 'name', 'email'], // Chọn các trường của User bạn muốn include
                            as: 'users' // Đặt tên alias cho User trong kết quả trả về
                        }
                    ]
                })
            }

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    orders
                }
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

            return new ApiResponse(res, {
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
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Bạn chưa có sản phẩm nào trong giỏ hàng'
                    }
                })
            }
            // Lấy ra sản phẩm trong giỏ hàng
            const cartItems = cart.cartItems
            const { cartId } = cart.cartItems[0]

            // Tạo đơn hàng
            const order = await Order.create({
                note,
                userId,
                cartId,
                createdAt: new Date()
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
            const finalPrice = await Cart.findOne({
                where: { userId, isPaid: false }
            })
            await order.update({ finalTotal: finalPrice.total })

            await cart.update({ isPaid: true })

            // Cập nhật số lượng bán khi đã lên đơn

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    order,
                    message: 'Đặt hàng thành công'
                }
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

            return new ApiResponse(res, {
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

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    message: 'Cập nhật đơn hàng thành công'
                }
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
        return ApiResponse.success(res, {
            status: 200,
            data: {
                message: 'Cập nhật đơn hàng thành công'
            }
        })
    }
    async setDeliveredOrder(req, res, next) {
        try {
            const { id: orderId } = req.params

            const order = await Order.findOne({
                where: {
                    id: orderId
                }
            })
            if (!order) {
                throw new ErrorResponse(404, 'Không tìm thấy đơn hàng')
            }

            // Cập nhật lại số lượng bán
            const cartItems = await CartItem.findAll({
                where: {
                    cartId: order.cartId
                }
            })

            if (!cartItems.length) {
                throw new ErrorResponse(404, 'Không tìm thấy sản phẩm trong giỏ hàng')
            }
            for (const cartItem of cartItems) {
                const productId = cartItem.productId
                const quantitySold = cartItem.quantity

                // Lấy thông tin sản phẩm từ bảng "Product"
                const product = await Product.findOne({
                    where: {
                        id: productId
                    }
                })

                if (!product) {
                    throw new ErrorResponse(404, `Không tìm thấy sản phẩm với ID ${productId}`)
                }

                // Cập nhật trường "sold" cho sản phẩm
                const currentSold = product.sold || 0
                product.sold = currentSold + quantitySold

                // Lưu thông tin sản phẩm đã cập nhật
                await product.save()
            }

            order.status = 'delivered'
            order.deliveredAt = new Date()
            await order.save()
            return ApiResponse.success(res, {
                status: 200,
                data: {
                    message: 'Cập nhật đơn hàng thành công'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new OrderController()
