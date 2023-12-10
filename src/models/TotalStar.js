const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')
const Product = require('./Product')

const TotalStar = sequelize.define(
    'TotalStar',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        total_star: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        total_reviewer: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: 'total_star'
    }
)

module.exports = TotalStar
