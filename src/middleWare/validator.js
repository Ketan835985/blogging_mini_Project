const { default: mongoose } = require("mongoose")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")

const titleCheck = (title) => {
    const arr = ['Mr', 'Miss', 'Mrs']
    if(! arr.includes(title)) return false
    return true
}

const authorCheck = async(authorId) => {
    const author = await authorModel.findById(authorId)
    if(author == null || !author) return false
    return true
}

const validObjectId = (objId) =>{
    return mongoose.Types.ObjectId.isValid(objId)
}

const blogCheck = async(blogId) => {
    const blog = await blogModel.findById(blogId)
    if(!blog || blog == null) return false
    return true
}


const authorization = async(req,res,next) => {
    try {
        const blogId = req.blogId
        const authorId = req.authorId
        const blog = await blogModel.findById(blogId)
        const author = blog.authorId
        if(author == authorId) {
            next()
        }
        else {
            res.status(403).send({ status: false, message: 'Unauthorized' })
        }

    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
}

module.exports ={titleCheck ,authorCheck ,validObjectId, blogCheck, authorization}