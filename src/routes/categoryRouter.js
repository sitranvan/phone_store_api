const { Router } = require('express')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const CategoryController = require('../controllers/CategoryController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const CategorySchema = require('../validations/CategorySchema')

const categoryRouter = Router()

categoryRouter.get('/', CategoryController.getAllCategory)

categoryRouter.get('/:id', CategoryController.getCategory)

categoryRouter.post(
    '/',
    jwtAuthMiddleware,
    validatorMiddleware(CategorySchema.createCategory),
    authorizedMiddleware('owner'),
    CategoryController.createCategory
)
categoryRouter.patch(
    '/:id',
    jwtAuthMiddleware,
    validatorMiddleware(CategorySchema.updateCategory),
    authorizedMiddleware('owner'),
    CategoryController.updateCategory
)

categoryRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), CategoryController.deleteCategory)

module.exports = categoryRouter
