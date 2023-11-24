const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../response/ErrorResponse')
const SuccessResponse = require('../response/SuccessResponse')
const env = require('../config/env')

class AuthController {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body

            // Kiểm tra email có tồn tại trong hệ thống
            const isExistEmail = await User.findOne({
                where: { email }
            })
            if (isExistEmail) {
                throw new ErrorResponse(409, 'Email đã tồn tại trong hệ thống')
            }

            // Mã hóa mật khẩu
            const hashedPassword = bcrypt.hashSync(password)
            // Tạo người dùng
            await User.create({
                name,
                email,
                password: hashedPassword
            })

            return new SuccessResponse(res, {
                status: 201,
                message: 'Đăng ký tài khoản thành công'
            })
        } catch (err) {
            next(err)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            // Kiểm tra email có tồn tại trong hệ thống
            const user = await User.findOne({
                where: { email }
            })
            if (!user) {
                throw new ErrorResponse(404, 'Người dùng không tồn tại trong hệ thống')
            }

            // Kiểm tra mật khẩu đúng
            const isMatchPassword = bcrypt.compareSync(password, user.password)
            if (!isMatchPassword) {
                throw new ErrorResponse(401, 'Mật khẩu không đúng')
            }
            // Tạo token
            const token = jwt.sign(
                {
                    id: user.id
                },
                env.SECRET_KEY,
                {
                    expiresIn: env.EXPIRED_IN
                }
            )
            return new SuccessResponse(res, {
                status: 200,
                message: 'Đăng nhập thành công',
                data: {
                    token
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthController()
