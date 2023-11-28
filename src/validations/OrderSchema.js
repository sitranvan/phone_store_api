const Joi = require('joi')
class OrderSchema {
    get createOrder() {
        return Joi.object({
            note: Joi.string().messages({
                'string.base': 'Lời nhắn phải là chuỗi',
                'string.empty': 'Lời nhắn không được để trống'
            })
        })
    }
    get cancelOrderById() {
        return Joi.object({
            canceledReason: Joi.string().messages({
                'string.base': 'Lí do hủy đơn phải là chuỗi',
                'string.empty': 'Lí do hủy đơn không được để trống'
            })
        })
    }
}

module.exports = new OrderSchema()
