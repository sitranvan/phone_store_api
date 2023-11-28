const Address = require('./Address')
const Brand = require('./Brand')
const Role = require('./Role')
const User = require('./User')
const Product = require('./Product')
const Category = require('./Category')
const Review = require('./Review')
const Cart = require('./Cart')
const CartItem = require('./CartItem')
const Order = require('./Order')
const OrderItem = require('./OrderItem')
const Coupon = require('./Coupon')

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
User.hasMany(Cart, {
    foreignKey: 'userId',
    as: 'carts'
})
Cart.belongsTo(User, {
    foreignKey: 'userId'
})

// Cart-CartItem
Cart.hasMany(CartItem, {
    foreignKey: 'cartId',
    as: 'cartItems'
})
CartItem.belongsTo(Cart, {
    foreignKey: 'cartId'
})

// CartItem-Product
CartItem.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'products'
})

Product.hasMany(CartItem, {
    foreignKey: 'productId'
})

// Order - Product
Order.belongsToMany(Product, {
    through: OrderItem,
    foreignKey: 'orderId',
    as: 'products'
})

Product.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: 'productId',
    as: 'ordersItem'
})

// Order - User
User.hasMany(Order, {
    foreignKey: 'userId'
})

Order.belongsTo(User, {
    foreignKey: 'userId'
})

//
User.hasMany(Order, {
    foreignKey: 'cancelledBy'
})

Order.belongsTo(User, {
    foreignKey: 'cancelledBy'
})

// Counpon-Cart
Coupon.hasMany(Cart, {
    foreignKey: 'couponId',
    as: 'carts'
})
Cart.belongsTo(Coupon, {
    foreignKey: 'couponId'
})
