const { Router } = require('express')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const BrandController = require('../controllers/BrandController')
const BrandSchema = require('../validations/BrandSchema')

const brandRouter = Router()

brandRouter.get('/', BrandController.getAllBrand)

brandRouter.post(
    '/',
    validatorMiddleware(BrandSchema.createBrand),
    jwtAuthMiddleware,
    authorizedMiddleware('owner'),
    BrandController.createBrand
)

brandRouter.patch(
    '/:id',
    validatorMiddleware(BrandSchema.updateBrand),
    jwtAuthMiddleware,
    authorizedMiddleware('owner'),
    BrandController.updateBrand
)

brandRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), BrandController.deleteBrand)
module.exports = brandRouter
