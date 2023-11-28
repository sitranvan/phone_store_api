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
        await queryInterface.bulkInsert('products', [
            {
                name: 'Samsung Galaxy A12',
                photo: 'img1.png',
                description:
                    'Samsung Galaxy A12 là một điện thoại phổ thông với màn hình lớn, đáp ứng nhu cầu giải trí và công việc hàng ngày. Nó được trang bị camera đa dạng với chế độ siêu rộng và macro, giúp bạn chụp ảnh theo nhiều góc độ khác nhau.',
                specification: 'Thông số kỹ thuật',
                price: 4290000,
                categoryId: 2,
                brandId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'iPhone SE (2020)',
                photo: 'img2.png',
                description:
                    'iPhone SE (2020) là một lựa chọn tốt nếu bạn muốn một điện thoại phổ thông với chất lượng xây dựng và hiệu suất ổn định của Apple, cùng với khả năng sử dụng các ứng dụng cơ bản. Mặc dù nó có thể chạy iOS và hỗ trợ một số tính năng cao cấp, nhưng bạn có thể sử dụng nó như một điện thoại phổ thông thông thường..',
                price: 4290000,
                specification: 'Thông số kỹ thuật',
                categoryId: 3,
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Xiaomi Redmi Note 10',
                photo: 'img3.png',
                description:
                    'Xiaomi Redmi Note 10 là một lựa chọn tốt với màn hình AMOLED, camera 48MP và pin lớn. Điện thoại này chạy hệ điều hành Android và có giá cả phải chăng.',
                specification: 'Thông số kỹ thuật',
                price: 2890000,
                categoryId: 2,
                brandId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'iPhone 13',
                photo: 'img4.png',
                description:
                    'iPhone 13 là một sản phẩm mới của Apple với iOS. Điện thoại này có màn hình Retina XDR, chip A15 Bionic, và camera chất lượng cao. Nó là một lựa chọn hoàn hảo cho người dùng iOS.',
                specification: 'Thông số kỹ thuật',
                price: 7990000,
                categoryId: 3,
                brandId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('products', null, {})
    }
}
