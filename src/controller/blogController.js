const { authorCheck, validObjectId, blogCheck } = require('../middleWare/validator')
const blogModel = require('../models/blogModel')




const createBlog = async (req, res) => {
    try {
        const { authorId, title, body, category } = req.body
        if (!authorId || !title || !body || !category) return res.status(400).send({ status: false, message: 'Please provide all the fields' })
        if (!validObjectId(authorId)) return res.status(400).send({ status: false, message: 'Invalid authorId' })
        if (!authorCheck(authorId)) return res.status(404).send({ status: false, message: 'authorId not found' })
        if (req.body.isPublished == true) {
            req.body.publishedAt = new Date()
        }
        const blog = await blogModel.create(req.body)
        res.status(201).send({ status: true, data: blog })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const getBlog = async (req, res) => {
    try {
        const data = req.query
        const getBlog = await blogModel.find({ ...data, isDeleted: false })
        if (getBlog.length == 0) res.status(404).send({ status: false, message: 'blog Not found' })
        res.status(200).send({ status: true, data: getBlog })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const authorId = req.authorId
        if (!validObjectId(blogId)) return res.status(400).send({ status: false, message: 'Invalid blogId' })
        if (blogCheck(blogId) == false) return res.status(404).send({ status: false, message: 'blog Not found' })
        const blog = await blogModel.findById(blogId)
        if (req.body.isPublished == true) {
            req.body.publishedAt = new Date()
        }
        const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false },{
            $set: {
                title: req.body.title,
                body: req.body.body,
                isPublished: req.body.isPublished,
                publishedAt: req.body.publishedAt
            },
        $addToSet: {
            tags:req.body.tags,
            subcategory:req.body.subcategory
        }}, { new: true })
        if (!updatedBlog || updatedBlog == null) return res.status(404).send({ status: false, message: 'blog Not found' })
        res.status(200).send({ status: true, message: 'Blog updated', data: updatedBlog })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const deleteBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const authorId = req.authorId
        if (!validObjectId(blogId)) return res.status(400).send({ status: false, message: 'Invalid blogId' })
        if (!blogCheck(blogId)) return res.status(404).send({ status: false, message: 'blog Not found' })
        const blog = await blogModel.findById(blogId)
        if (blog == null) return res.status(404).send({ status: false, message: 'blog Not found' })
        const deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, { new: true })
        if (!deletedBlog || deletedBlog == null) return res.status(404).send({ status: false, message: 'blog Not found' })
        res.status(200).send({ status: true})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const deleteBlogByQuery = async (req, res) => {
    try {
        const data = req.query
        const authorId = req.authorId
        const blogs = await blogModel.updateMany({ ...data, isDeleted: false, authorId: authorId }, { isDeleted: true, deletedAt: new Date() }, { new: true })
        if (blogs.modifiedCount == 0) return res.status(404).send({ status: false, message: 'blog Not found' })
        res.status(200).send({ status: true })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createBlog, getBlog, updateBlog, deleteBlogById, deleteBlogByQuery }