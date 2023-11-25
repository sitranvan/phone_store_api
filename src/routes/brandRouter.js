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
module.exports = brandRouter
