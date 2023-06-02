const router = require('express').Router();
const {createBlog, getBlog, updateBlog, deleteBlogById, deleteBlogByQuery} = require('../controller/blogController');
const { createAuthor, authorLogin } = require('../controller/authorController')
const {authenticationFun, authorHandel, blogHandel} = require('../middleWare/middleWare');
const { authorization } = require('../middleWare/validator');

router.post('/authors', createAuthor)
router.post('/login', authorLogin)
router.post('/blogs',authorHandel ,authenticationFun, createBlog)
router.get('/blogs',authenticationFun ,getBlog)
router.put('/blogs/:blogId',blogHandel, authenticationFun,authorization,updateBlog)
router.delete('/blogs/:blogId',blogHandel ,authenticationFun,authorization, deleteBlogById)
router.delete('/blogs', authenticationFun, deleteBlogByQuery)

module.exports = router;