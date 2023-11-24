const Joi = require('joi')
class AuthSchema {
    get register() {
        return Joi.object({
            name: Joi.string().required().messages({
                'string.base': 'Tên phải là chuỗi',
                'string.empty': 'Tên không được để trống',
                'any.required': 'Tên là trường bắt buộc'
            }),
            email: Joi.string().email().required().messages({
                'string.base': 'Email phải là chuỗi',
                'string.empty': 'Email không được để trống',
                'string.email': 'Email không hợp lệ',
                'any.required': 'Email là trường bắt buộc'
            }),
            password: Joi.string().required().messages({
                'string.base': 'Mật khẩu phải là chuỗi',
                'string.empty': 'Mật khẩu không được để trống',
                'any.required': 'Mật khẩu là trường bắt buộc'
            })
        })
    }
    get login() {
        return Joi.object({
            email: Joi.string().email().required().messages({
                'string.base': 'Email phải là chuỗi',
                'string.empty': 'Email không được để trống',
                'string.email': 'Email không hợp lệ',
                'any.required': 'Email là trường bắt buộc'
            }),
            password: Joi.string().required().messages({
                'string.base': 'Mật khẩu phải là chuỗi',
                'string.empty': 'Mật khẩu không được để trống',
                'any.required': 'Mật khẩu là trường bắt buộc'
            })
        })
    }
}

module.exports = new AuthSchema()
