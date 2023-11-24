const sequelize = require('./connectMysql')

const connectToMysql = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected mysql successfully')
    } catch (error) {
        console.error('Failed to connect mysql', error)
    }
}

connectToMysql()
