const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')
const Category = require('./Category')
const Brand = require('./Brand')

const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        specification: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        promotionPrice: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        sold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Brand,
                key: 'id'
            }
        }
    },
    {
        tableName: 'products'
    }
)

module.exports = Product
