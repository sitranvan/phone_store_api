const { DataTypes } = require('sequelize')
const sequelize = require('../database/connectMysql')

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Role
