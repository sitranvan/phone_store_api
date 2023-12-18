const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')
const User = require('./User')
const Address = sequelize.define(
    'Address',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        province: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        district: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        village: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        shortDescription: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
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
        tableName: 'address'
    }
)
module.exports = Address
