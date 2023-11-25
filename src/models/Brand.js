const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')

const Brand = sequelize.define(
    'Brand',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'brands'
    }
)

module.exports = Brand
