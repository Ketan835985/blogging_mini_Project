const jwt = require('jsonwebtoken');
const { SECRETE_KEY } = require('../../config')
const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')
const mongoose = require('mongoose')



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
        const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, message: 'Please provide token' })
        if (!authorId) {
            return res.status(400).send({ status: false, message: "Author id is missing" })
        } else {
            if (!mongoose.Types.ObjectId.isValid(authorId)) {
                return res.status(400).send({ status: false, message: ' blog id is not valid' })
            }
            else {
                const author = await authorModel.findById(authorId)
                if (!author || author === null) {
                    return res.status(404).send({ status: false, message: 'not found author' })
                } else {
                    next()
                }
            }
        }
    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
}

const blogHandel = async (req, res, next) => {
    try {
        const blogId = req.params.blogId
        const authorId = req.authorId
        const token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, message: 'Please provide token' })
        if (!mongoose.Types.ObjectId.isValid(blogId)) return res.status(400).send({ status: false, message: ' blog id is not valid' })
        const blog = await blogModel.findById(blogId)
        if (!blog || blog == null) {
            res.status(404).send({ status: false, message: 'not found blog' })
        } else {
            req.blogId = blogId
            next()
        }
    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
}


module.exports = { authenticationFun, authorHandel, blogHandel }