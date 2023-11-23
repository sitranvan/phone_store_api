require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || 'st6302',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_DATABASE: process.env.MONGO_DATABASE,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,

    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
    MYSQL_PORT: process.env.MYSQL_PORT || 3306,
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'root',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'my_database',

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'stv6302',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'stv6302',
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN || 'stv6302',
    GOOGLE_TEST_EMAIL: process.env.GOOGLE_TEST_EMAIL || 'test@gmail.com'
}
