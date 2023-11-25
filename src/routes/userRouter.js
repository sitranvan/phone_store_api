const { Router } = require('express')
const UserController = require('../controllers/UserController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const UserSchema = require('../validations/UserSchema')

const userRouter = Router()

userRouter.get('/me', jwtAuthMiddleware, UserController.getMe)
userRouter.patch(
    '/update',
    // form-data không validation được
    // validatorMiddleware(UserSchema.updateMe),
    uploadMiddleware.single('avatar'),
    jwtAuthMiddleware,
    UserController.updateMe
)

module.exports = userRouter
