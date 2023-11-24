const errorMiddleware = (err, req, res, next) => {
    const { code, message } = err

    res.status(code).json({
        success: false,
        message: message || 'Internal Error.'
    })
}

module.exports = errorMiddleware
