class SuccessResponse {
    constructor(res, { status = 200, message = '', data = null }) {
        const responseObj = {
            success: true,
            message
        }

        if (data !== null) {
            responseObj.data = data
        }

        res.status(status).json(responseObj)
    }
}
module.exports = SuccessResponse
