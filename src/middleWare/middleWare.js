const jwt = require('jsonwebtoken');
const {SECRETE_KEY} = require('../../config')



const authenticationFun = async (req, res, next) => {
    try {
        const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, message: 'Please provide token' })
        const decoded = jwt.verify(token, SECRETE_KEY)
        req.authorId = decoded.authorId
        next()
    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
}

module.exports = authenticationFun