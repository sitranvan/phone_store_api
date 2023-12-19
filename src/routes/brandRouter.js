const { Router } = require('express')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const BrandController = require('../controllers/BrandController')
const BrandSchema = require('../validations/BrandSchema')

const brandRouter = Router()

brandRouter.get('/', BrandController.getAllBrand)
brandRouter.get('/:id', BrandController.getBrand)

brandRouter.post(
    '/',
    jwtAuthMiddleware,
    validatorMiddleware(BrandSchema.createBrand),
    authorizedMiddleware('owner'),
    BrandController.createBrand
)

brandRouter.patch(
    '/:id',
    jwtAuthMiddleware,
    validatorMiddleware(BrandSchema.updateBrand),
    authorizedMiddleware('owner'),
    BrandController.updateBrand
)

brandRouter.delete('/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), BrandController.deleteBrand)
module.exports = brandRouter
