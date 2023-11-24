const connectMongo = require('./connectMongo')
const sequelize = require('./connectMysql')

const connectToMysql = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected mysql successfully')
    } catch (err) {
        console.log('Failed to connect mysql')
    }
}

const connectToMongo = async () => {
    try {
        await connectMongo()
        console.log('Connected mongo successfully!')
    } catch (err) {
        console.log('Failed to connect mongo')
    }
}
connectToMysql()
connectToMongo()
