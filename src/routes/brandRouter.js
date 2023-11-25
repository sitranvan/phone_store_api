const { Router } = require('express')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const BrandController = require('../controllers/BrandController')

const brandRouter = Router()

brandRouter.get('/', BrandController.getAllBrand)

module.exports = brandRouter
