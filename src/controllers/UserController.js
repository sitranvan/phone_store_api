const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Address = require('../models/Address')
const User = require('../models/User')
const ErrorResponse = require('../response/ErrorResponse')
const ApiResponse = require('../response/ApiResponse')
const { env } = require('../config/env')

class UserController {
    async getMe(req, res, next) {
        try {
            const { id: userId } = req.user
            const user = await User.findByPk(userId, {
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: Address,
                        as: 'address',
                        attributes: {
                            exclude: ['userId']
                        }
                    }
                ]
            })
            return new ApiResponse(res, {
                success: true,
                data: user
            })
        } catch (err) {
            next(err)
        }
    }

    async updateMe(req, res, next) {
        try {
            const { province, district, village, shortDescription, avatar } = req.body

            const { id: userId } = req.user
            const existedAddress = await Address.findOne({
                where: {
                    userId
                }
            })
            if (existedAddress) {
                // Cập nhật
                existedAddress.province = province
                existedAddress.district = district
                existedAddress.village = village
                existedAddress.shortDescription = shortDescription
                await existedAddress.save()
            } else {
                // Tạo mới
                await Address.create({
                    userId,
                    province,
                    district,
                    village,
                    shortDescription
                })
            }
            if (req.file) {
                const { filename } = req.file
                await User.update(
                    {
                        avatar: filename
                    },
                    {
                        where: {
                            id: userId
                        }
                    }
                )
            }
            const user = await User.findByPk(userId, {
                include: [
                    {
                        model: Address,
                        as: 'address'
                    }
                ]
            })
            return new ApiResponse(res, {
                status: 200,
                data: user
            })
        } catch (err) {
            next(err)
        }
    }

    async updatePassword(req, res, next) {
        try {
            const { id: userId } = req.user
            const { oldPassword, newPassword } = req.body

            const user = await User.findByPk(userId)
            const isMatch = bcrypt.compareSync(oldPassword, user.password)

            if (!isMatch) {
                throw new ErrorResponse(400, 'Mật khẩu cũ không chính xác')
            }
            if (oldPassword === newPassword) {
                throw new ErrorResponse(400, 'Mật khẩu mới phải khác mật khẩu cũ')
            }

            const hashedPassword = bcrypt.hashSync(newPassword)

            user.password = hashedPassword
            await user.save()

            return new ApiResponse(res, {
                status: 200,
                message: 'Cập nhật mật khẩu thành công'
            })
        } catch (err) {
            next(err)
        }
    }

    async logout(req, res, next) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '')

            if (!token) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tồn tại 1'
                    }
                })
            }
            const isTokenValid = jwt.verify(token, env.SECRET_KEY)
            if (!isTokenValid) {
                return ApiResponse.error(res, {
                    status: 404,
                    data: {
                        message: 'Không tồn tại 2'
                    }
                })
            }

            return ApiResponse.success(res, {
                status: 200,
                data: {
                    message: 'Đăng xuất tài khoản thành công'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController()
