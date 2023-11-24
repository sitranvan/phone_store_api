const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const AuthSchema = require('../validations/AuthSchema')

const authRouter = Router()

authRouter.post('/register', validatorMiddleware(AuthSchema.register), AuthController.register)
authRouter.post('/login', validatorMiddleware(AuthSchema.login), AuthController.login)
authRouter.post('/verify', AuthController.verifyOtp)
authRouter.post('/resend-otp', AuthController.resendOtp)
authRouter.post('/forgot-password', AuthController.forgotPassword)
authRouter.post('/resend-forgot-token', AuthController.resendForgotToken)
authRouter.post('/verify-token', AuthController.verifyForgotToken)
authRouter.post('/reset-password', AuthController.resetPassword)
module.exports = authRouter
