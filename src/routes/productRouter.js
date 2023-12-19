const { Router } = require('express')
const ProductController = require('../controllers/ProductController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const uploadMiddleware = require('../middlewares/uploadMiddleware')

const productRouter = Router()

productRouter.get('/', ProductController.getAllProduct)
productRouter.get('/:id', ProductController.getDetailProduct)
productRouter.post(
    '/',
    jwtAuthMiddleware,

    uploadMiddleware.single('photo'),
    authorizedMiddleware('owner'),
    ProductController.createProduct
)

productRouter.patch(
    '/:id',
    jwtAuthMiddleware,
    uploadMiddleware.single('photo'),
    authorizedMiddleware('owner'),
    ProductController.updateProduct
)

productRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), ProductController.deleteProduct)

module.exports = productRouter
