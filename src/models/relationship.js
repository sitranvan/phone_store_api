const Role = require('./Role')
const User = require('./User')

// User-Role
User.belongsTo(Role, {
    foreignKey: 'role'
})

Role.hasMany(User, {
    foreignKey: 'role'
})
