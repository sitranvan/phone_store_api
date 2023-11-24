const { Router } = require('express')
const AuthController = require('../controllers/AuthController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const AuthSchema = require('../validations/AuthSchema')

const authRouter = Router()

authRouter.post('/register', validatorMiddleware(AuthSchema.register), AuthController.register)
authRouter.post('/login', validatorMiddleware(AuthSchema.login), AuthController.login)
authRouter.post('/verify', validatorMiddleware(AuthSchema.verifyOtp), AuthController.verifyOtp)
authRouter.post('/resend-otp', validatorMiddleware(AuthSchema.resendOtp), AuthController.resendOtp)
authRouter.post('/forgot-password', validatorMiddleware(AuthSchema.forgotPassword), AuthController.forgotPassword)
authRouter.post(
    '/resend-forgot-token',
    validatorMiddleware(AuthSchema.resendForgotToken),
    AuthController.resendForgotToken
)
authRouter.post('/verify-token', validatorMiddleware(AuthSchema.verifyForgotToken), AuthController.verifyForgotToken)
authRouter.post('/reset-password', validatorMiddleware(AuthSchema.resetPassword), AuthController.resetPassword)
module.exports = authRouter
