const { Router } = require('express')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const CategoryController = require('../controllers/CategoryController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const CategorySchema = require('../validations/CategorySchema')

const categoryRouter = Router()

categoryRouter.get('/', CategoryController.getAllCategory)
categoryRouter.post(
    '/',
    validatorMiddleware(CategorySchema.createCategory),
    jwtAuthMiddleware,
    authorizedMiddleware('owner'),
    CategoryController.createCategory
)

module.exports = categoryRouter
