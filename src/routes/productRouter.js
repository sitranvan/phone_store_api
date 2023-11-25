const { Router } = require('express')
const ProductController = require('../controllers/ProductController')

const productRouter = Router()

productRouter.get('/', ProductController.getAllProduct)

module.exports = productRouter
