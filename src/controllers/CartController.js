const { response } = require('express')
const Cart = require('../models/Cart')
const ErrorResponse = require('../response/ErrorResponse')
const SuccessResponse = require('../response/SuccessResponse')
const Product = require('../models/Product')

class CartController {
    async addProductToCart(req, res, next) {
        try {
            const { productId } = req.body
            const { id: userId } = req.user
            const cart = await Cart.findOne({
                where: {
                    userId: userId,
                    productId: productId
                }
            })
            if (cart) {
                throw new ErrorResponse(409, 'Sản phẩm đã có trong giỏ hàng')
            }
            const newCart = await Cart.create({
                userId: userId,
                productId: productId
            })

            return new SuccessResponse(res, {
                status: 201,
                data: newCart
            })
        } catch (err) {
            next(err)
        }
    }

    async getCart(req, res, next) {
        try {
            const { id: userId } = req.user
            const carts = await Cart.findAll({
                where: {
                    userId,
                    isOrdered: false
                },
                include: [
                    {
                        model: Product,
                        as: 'products',
                        attributes: ['name', 'photo', 'price']
                    }
                ]
            })
            return new SuccessResponse(res, {
                status: 200,
                data: carts
            })
        } catch (err) {
            next(err)
        }
    }
    async deleteProductFromCart(req, res, next) {
        try {
            const { id: productId } = req.params
            const { id: userId } = req.user
            const cart = await Cart.findOne({
                where: {
                    userId,
                    productId
                }
            })
            if (!cart) {
                throw new ErrorResponse(404, 'Sản phẩm không tồn tại trong giỏ hàng')
            }
            await cart.destroy()
            return new SuccessResponse(res, {
                status: 200,
                data: cart
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CartController()
