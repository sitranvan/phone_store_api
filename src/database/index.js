const connectMongo = require('./connectMongo')
const sequelize = require('./connectMysql')

const connectToMysql = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected mysql successfully')
    } catch (error) {
        console.error('Failed to connect mysql', error)
    }
}

const connectToMongo = async () => {
    try {
        await connectMongo()
        console.log('Connected mongo successfully!')
    } catch (error) {
        console.error('Failed to connect mongo', error)
    }
}
connectToMysql()
connectToMongo()
