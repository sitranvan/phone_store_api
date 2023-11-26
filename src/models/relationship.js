const Address = require('./Address')
const Brand = require('./Brand')
const Role = require('./Role')
const User = require('./User')
const Product = require('./Product')
const Category = require('./Category')

// User-Address
User.hasMany(Address, {
    foreignKey: 'userId',
    as: 'address'
})
Address.belongsTo(User, {
    foreignKey: 'userId'
})

// User-Role
User.belongsTo(Role, {
    foreignKey: 'role',
    as: 'roles'
})

Role.hasMany(User, {
    foreignKey: 'role'
})

// Product-Category
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
})
Category.hasMany(Product, {
    foreignKey: 'categoryId'
})

// Product-Brand
Product.belongsTo(Brand, {
    foreignKey: 'brandId',
    as: 'brand'
})
Brand.hasMany(Product, {
    foreignKey: 'brandId'
})
