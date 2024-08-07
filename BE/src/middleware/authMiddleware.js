//file này cho ta biết chỉ có admin mới được quyền xóa tài khoản của chúng ta
const jwt = require('jsonwebtoken')

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token,'access_token', function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The Authenticationnnnn',
                status: 'ERROR'
            })
        }
        const {payload}=user
        if (payload?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemticationmmmmmzzzzzzzzz',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, 'access_token', function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemticationnnnmmmmmmmm',
                status: 'ERROR'
            })
        }
        const {payload}=user
        if (payload?.isAdmin || payload?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemticationggggggggg',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}