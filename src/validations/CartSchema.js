const Joi = require('joi')
class CartSchema {
    get updateCartItemTotalPrice() {
        return Joi.object({
            quantity: Joi.number().required().messages({
                'number.base': 'Số lượng phải là số nguyên',
                'string.empty': 'Số lượng không được để trống',
                'any.required': 'Số lượng trường bắt buộc'
            })
        })
    }
}

module.exports = new CartSchema()
