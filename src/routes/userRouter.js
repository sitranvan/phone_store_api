const { Router } = require('express')
const UserController = require('../controllers/UserController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware')

const userRouter = Router()

userRouter.get('/me', jwtAuthMiddleware, UserController.getMe)

module.exports = userRouter
