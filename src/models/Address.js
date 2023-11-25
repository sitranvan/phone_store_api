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
        province: {
            type: DataTypes.STRING,
            allowNull: true
        },
        district: {
            type: DataTypes.STRING,
            allowNull: true
        },
        village: {
            type: DataTypes.STRING,
            allowNull: true
        },
        shortDescription: {
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
        tableName: 'address'
    }
)
module.exports = Address
