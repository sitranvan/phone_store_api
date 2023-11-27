const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')
const Order = require('./Order')
const Product = require('./Product')

const OrderItem = sequelize.define(
    'OrderItem',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Order,
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
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        tableName: 'orders_item',
        paranoid: true
    }
)

module.exports = OrderItem
