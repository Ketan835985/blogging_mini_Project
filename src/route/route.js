const router = require('express').Router();
const {createBlog, getBlog, updateBlog, deleteBlogById, deleteBlogByQuery} = require('../controller/blogController');
const { createAuthor, authorLogin } = require('../controller/authorController')
const authenticationFun = require('../middleWare/middleWare');

router.post('/authors', createAuthor)
router.post('/login', authorLogin)
router.post('/blogs', authenticationFun, createBlog)
router.get('/blogs',authenticationFun ,getBlog)
router.put('/blogs/:blogId', authenticationFun,updateBlog)
router.delete('/blogs/:blogId', authenticationFun, deleteBlogById)
router.delete('/blogs', authenticationFun, deleteBlogByQuery)

module.exports = router;