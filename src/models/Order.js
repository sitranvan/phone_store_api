const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')
const User = require('./User')

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
        canceledReason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        tableName: 'orders',
        paranoid: true
    }
)

module.exports = Order
