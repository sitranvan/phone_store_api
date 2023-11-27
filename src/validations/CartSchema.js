const Joi = require('joi')
class CartSchema {
    get addProductToCart() {
        return Joi.object({
            productId: Joi.required().messages({
                'string.empty': 'Mã sản phẩm không được để trống',
                'any.required': 'Mã sản phẩm trường bắt buộc'
            })
        })
    }
}

module.exports = new CartSchema()
