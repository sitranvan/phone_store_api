'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('carts_item', 'quantity', {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            after: 'productId'
        })

        await queryInterface.addColumn('carts_item', 'total', {
            type: DataTypes.FLOAT,
            allowNull: false,
            after: 'quantity',
            defaultValue: 0
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('carts_item', 'quantity')
        await queryInterface.removeColumn('carts_item', 'total')
    }
}
