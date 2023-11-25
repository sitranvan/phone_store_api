const Address = require('./Address')
const Role = require('./Role')
const User = require('./User')

// User-Address
User.hasMany(Address, {
    foreignKey: 'userId',
    as: 'address'
})
Address.belongsTo(User, {
    foreignKey: 'userId'
})

User.belongsTo(Role, {
    foreignKey: 'role',
    as: 'roles'
})

Role.hasMany(User, {
    foreignKey: 'role'
})
