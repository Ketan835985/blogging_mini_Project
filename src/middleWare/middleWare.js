const jwt = require('jsonwebtoken');
const { SECRETE_KEY } = require('../../config')



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

const authorHandel = async (req, res, next) => {
    try {
        const authorId = req.body.authorId
        const author = await authorModel.findById(authorId)
        if (!author || author === null) {
            return res.status(404).send({ status: false, message: 'not found author' })
        } else {
            next()
        }
    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
}

const blogHandel = async (req, res, next) => {
    try {
        const blogId = req.params.blogId
        const blog = await blogModel.findById(blogId)
        if (!blog || blog === null) {
            return res.status(404).send({ status: false, message: 'not found blog' })
        } else {
            next()
        }
    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
}


module.exports = {authenticationFun, authorHandel,blogHandel}