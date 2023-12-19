const { Router } = require('express')
const UserController = require('../controllers/UserController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const UserSchema = require('../validations/UserSchema')
const authorizedMiddleware = require('../middlewares/authorizedMiddleware')

const userRouter = Router()

userRouter.get('/me', jwtAuthMiddleware, UserController.getMe)
userRouter.get('/', jwtAuthMiddleware, authorizedMiddleware('owner'), UserController.getAll)
userRouter.get('/:id', jwtAuthMiddleware, authorizedMiddleware('owner'), UserController.getMe)
userRouter.patch(
    '/update',
    // form-data không validation được
    // validatorMiddleware(UserSchema.updateMe),
    jwtAuthMiddleware,
    uploadMiddleware.single('avatar'),
    UserController.updateMe
)

userRouter.patch(
    '/update-password',
    jwtAuthMiddleware,
    validatorMiddleware(UserSchema.updatePassword),
    UserController.updatePassword
)
userRouter.post('/logout', jwtAuthMiddleware, UserController.logout)

module.exports = userRouter
