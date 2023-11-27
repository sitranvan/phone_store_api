const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')
const Cart = require('./Cart')
const Product = require('./Product')

const CartItem = sequelize.define(
    'CartItem',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cart,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            }
        }
    },
    {
        tableName: 'carts_item'
    }
)

module.exports = CartItem
