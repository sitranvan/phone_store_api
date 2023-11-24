const { mongoose } = require('mongoose')
const { env } = require('../config/env')

const connectMongo = async () => {
    await mongoose.connect(env.getMongoUri())
}

module.exports = connectMongo
