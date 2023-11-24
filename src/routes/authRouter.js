const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const AuthSchema = require('../validations/AuthSchema')

const authRouter = Router()

authRouter.post('/register', validatorMiddleware(AuthSchema.register), AuthController.register)
authRouter.post('/login', validatorMiddleware(AuthSchema.login), AuthController.login)

module.exports = authRouter
