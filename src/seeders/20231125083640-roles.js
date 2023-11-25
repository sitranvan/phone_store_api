'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'roles',
            [
                {
                    name: 'Admin',
                    slug: 'admin',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Owner',
                    slug: 'owner',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'Customer',
                    slug: 'customer',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('roles', null, {})
    }
}
