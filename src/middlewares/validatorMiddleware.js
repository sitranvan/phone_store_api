// property => req.body
const validatorMiddleware = (schema, property = 'body') => {
    return (req, res, next) => {
        console.log(schema)
        const { error } = schema.validate(req[property])
        if (!error) {
            next()
        } else {
            const { details } = error
            const message = details[0].message
            const path = details[0].path
            return res.status(422).json({
                success: false,
                error: {
                    message,
                    path: path[0]
                }
            })
        }
    }
}

module.exports = validatorMiddleware
