const Address = require('./Address')
const Brand = require('./Brand')
const Role = require('./Role')
const User = require('./User')
const Product = require('./Product')
const Category = require('./Category')
const Review = require('./Review')
const Cart = require('./Cart')

// User-Address
User.hasMany(Address, {
    foreignKey: 'userId',
    as: 'address'
})
Address.belongsTo(User, {
    foreignKey: 'userId'
})

// Role-User
Role.hasMany(User, {
    foreignKey: 'role'
})
User.belongsTo(Role, {
    foreignKey: 'role',
    as: 'roles'
})

// Category-Product
Category.hasMany(Product, {
    foreignKey: 'categoryId'
})

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
})

// Brand-Product
Brand.hasMany(Product, {
    foreignKey: 'brandId'
})
Product.belongsTo(Brand, {
    foreignKey: 'brandId',
    as: 'brand'
})

// Product-Review
Product.hasMany(Review, {
    foreignKey: 'productId',
    as: 'reviews'
})
Review.belongsTo(Product, {
    foreignKey: 'productId'
})

// User-Review
User.hasMany(Review, {
    foreignKey: 'userId',
    as: 'reviews'
})
Review.belongsTo(User, {
    foreignKey: 'userId'
})

// User-Cart
User.hasOne(Cart, {
    foreignKey: 'userId',
    as: 'carts'
})
Cart.belongsTo(User, {
    foreignKey: 'userId'
})

// Product-Cart
Product.hasOne(Cart, {
    foreignKey: 'productId'
})
Cart.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'products'
})
