const jwt = require('jsonwebtoken')
const ErrorResponse = require('../response/ErrorResponse')
const { env } = require('../config/env')

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ErrorResponse(401, 'Không được phép')
    }
    const token = authHeader.split(' ')[1]
    if (!token) throw new ErrorResponse(401, 'Không được phép')

    try {
        const user = jwt.verify(token, env.SECRET_KEY)
        req.user = user
    } catch (err) {
        throw new ErrorResponse(401, 'Không được phép')
    }
    next()
}

module.exports = jwtAuthMiddleware
