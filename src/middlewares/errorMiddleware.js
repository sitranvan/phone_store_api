const errorMiddleware = (err, req, res, next) => {
    const { code, message } = err

    res.status(typeof code === 'number' ? code : 500).json({
        success: false,
        message: message || 'Internal Error.'
    })
}

module.exports = errorMiddleware
