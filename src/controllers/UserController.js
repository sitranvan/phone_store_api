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
            res.status(200).json({
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

            return new SuccessResponse(res, {
                status: 200,
                message: 'Cập nhật thông tin thành công'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController()
