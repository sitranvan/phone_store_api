const bcrypt = require('bcryptjs')
const Address = require('../models/Address')
const User = require('../models/User')
const ErrorResponse = require('../response/ErrorResponse')
const SuccessResponse = require('../response/SuccessResponse')

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
            return new SuccessResponse(res, {
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
            return new SuccessResponse(res, {
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

            return new SuccessResponse(res, {
                status: 200,
                message: 'Cập nhật mật khẩu thành công'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController()
