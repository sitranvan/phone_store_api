const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')

const Coupon = sequelize.define(
    'Coupon',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // percent, money
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'coupons'
    }
)

module.exports = Coupon
