const { Router } = require('express')
const ProductController = require('../controllers/ProductController')

const productRouter = Router()

productRouter.get('/', ProductController.getAllProduct)
productRouter.get('/:id', ProductController.getDetailProduct)

module.exports = productRouter
