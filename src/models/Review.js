const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')
const Product = require('./Product')
const User = require('./User')
const { model } = require('mongoose')

const Review = sequelize.define(
    'Review',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        isHidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            }
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
        tableName: 'reviews'
    }
)

module.exports = Review
