const bcrypt = require('bcryptjs')
const User = require('../models/User')
const ErrorResponse = require('../response/ErrorResponse')
const SuccessResponse = require('../response/SuccessResponse')

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
}

module.exports = new AuthController()
