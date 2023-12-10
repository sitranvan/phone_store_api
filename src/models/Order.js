const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')
const User = require('./User')
const Cart = require('./Cart')

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // pending, shipped, delivered, cancelled
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        },
        deliveredAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Cart,
                key: 'id'
            }
        },
        canceledReason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cancelledBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            after: 'canceledReason',
            references: {
                model: 'users',
                key: 'id'
            }
        },
        cancelledAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        finalTotal: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    },
    {
        tableName: 'orders',
        paranoid: true
    }
)

module.exports = Order
