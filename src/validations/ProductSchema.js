const Joi = require('joi')

class ProductShema {
    get createProduct() {
        return Joi.object({
            name: Joi.string().required().messages({
                'string.base': 'Tên phải là chuỗi',
                'string.empty': 'Tên không được để trống',
                'any.required': 'Tên là trường bắt buộc'
            }),
            description: Joi.string().allow().messages({
                'string.base': 'Mô tả phải là chuỗi',
                'string.empty': 'Mô tả được để trống'
            }),
            specification: Joi.string().allow().messages({
                'string.base': 'Thông số kỹ thuật phải là chuỗi',
                'string.empty': 'Thông số kỹ thuật được để trống'
            }),
            price: Joi.number().required().message({
                'number.base': 'Giá phải là số',
                'number.empty': 'Giá không được để trống',
                'any.required': 'Giá là trường bắt buộc'
            }),
            categoryId: Joi.number().required().message({
                'any.required': 'Mã danh mục là trường bắt buộc',
                'number.base': 'Mã danh mục phải là số',
                'number.empty': 'Mã danh mục không được để trống'
            }),
            brandId: Joi.number().required().message({
                'any.required': 'Mã thương hiệu là trường bắt buộc',
                'number.base': 'Mã thương hiệu phải là số',
                'number.empty': 'Mã thương hiệu không được để trống'
            })
        })
    }
    get updateProduct() {
        return Joi.object({
            name: Joi.string().messages({
                'string.base': 'Tên phải là chuỗi',
                'string.empty': 'Tên không được để trống'
            }),
            description: Joi.string().allow().messages({
                'string.base': 'Mô tả phải là chuỗi',
                'string.empty': 'Mô tả được để trống'
            }),
            specification: Joi.string().allow().messages({
                'string.base': 'Thông số kỹ thuật phải là chuỗi',
                'string.empty': 'Thông số kỹ thuật được để trống'
            }),
            price: Joi.number().message({
                'number.base': 'Giá phải là số'
            }),
            categoryId: Joi.number().message({
                'number.base': 'Mã danh mục phải là số'
            }),
            brandId: Joi.number().message({
                'number.base': 'Mã thương hiệu phải là số'
            })
        })
    }
}

module.exports = new ProductShema()
