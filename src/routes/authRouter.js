const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const AuthSchema = require('../validations/AuthSchema')

const authRouter = Router()

authRouter.post('/register', validatorMiddleware(AuthSchema.register), AuthController.register)

module.exports = authRouter
