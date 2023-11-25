const Joi = require('joi')
class UserSchema {
    get updateMe() {
        return Joi.object({
            province: Joi.string().messages({
                'string.base': 'Tỉnh thành phải là chuỗi',
                'string.empty': 'Tỉnh thành không được để trống'
            }),
            district: Joi.string().messages({
                'string.base': 'Huyện phải là chuỗi',
                'string.empty': 'Huyện không được để trống'
            }),
            village: Joi.string().messages({
                'string.base': 'Xã phải là chuỗi',
                'string.empty': 'Xã không được để trống'
            }),
            shortDescription: Joi.string().messages({
                'string.base': 'Mô tả địa chỉ phải là chuỗi',
                'string.empty': 'Mô tả địa chỉ không được để trống'
            })
        })
    }
}

module.exports = new UserSchema()
