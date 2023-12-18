const Joi = require('joi')
class CouponSchema {
    get createCoupon() {
        return Joi.object({
            code: Joi.string().required().messages({
                'string.base': 'Mã khuyến mãi phải là chuỗi',
                'string.empty': 'Mã khuyến mãi không được để trống',
                'any.required': 'Mã khuyến mãi trường bắt buộc'
            }),
            type: Joi.string().required().messages({
                'string.base': 'Loại khuyến mãi phải là chuỗi',
                'string.empty': 'Loại khuyến mãi không được để trống',
                'any.required': 'Loại khuyến mãi trường bắt buộc'
            }),
            value: Joi.number().required().messages({
                'number.base': 'Giá trị phải là số',
                'string.empty': 'Giá trị không được để trống',
                'any.required': 'Giá trị trường bắt buộc'
            }),
            description: Joi.string().required().messages({
                'string.base': 'Mô tả phải là chuỗi',
                'string.empty': 'Mô tả không được để trống',
                'any.required': 'Mô tả trường bắt buộc'
            })
        })
    }

    get updateCoupon() {
        return Joi.object({
            code: Joi.string().messages({
                'string.base': 'Mã khuyến mãi phải là chuỗi',
                'string.empty': 'Mã khuyến mãi không được để trống'
            }),
            type: Joi.string().messages({
                'string.base': 'Loại khuyến mãi phải là chuỗi',
                'string.empty': 'Loại khuyến mãi không được để trống'
            }),
            value: Joi.number().messages({
                'number.base': 'Giá trị phải là số',
                'string.empty': 'Giá trị không được để trống'
            }),
            description: Joi.string().messages({
                'string.base': 'Mô tả phải là chuỗi',
                'string.empty': 'Mô tả không được để trống'
            })
        })
    }

    get addCouponToCart() {
        return Joi.object({
            codeCoupon: Joi.string().required().messages({
                'string.base': 'Mã khuyến mãi phải là chuỗi',
                'string.empty': 'Mã khuyến mãi không được để trống',
                'any.required': 'Mã khuyến mãi trường bắt buộc'
            })
        })
    }
    get getCoupon() {
        return Joi.object({
            code: Joi.string().required().messages({
                'string.base': 'Mã khuyến mãi phải là chuỗi',
                'string.empty': 'Mã khuyến mãi không được để trống',
                'any.required': 'Mã khuyến mãi trường bắt buộc'
            })
        })
    }
}

module.exports = new CouponSchema()
