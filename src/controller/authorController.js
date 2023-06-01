const { titleCheck } = require('../middleWare/validator')
const authorModel = require('../models/authorModel')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const {SECRETE_KEY} = require('../../config')


const createAuthor = async (req, res) => {
    try {
        const { title, fname, lname, email, password } = req.body
        if (!title || !fname || !lname || !email || !password) return res.status(400).send({ status: false, message: 'please Provide all the fields' })
        if (!titleCheck(title)) res.status(400).send({ status: false, message: `Provide a valid title ` })
        if (!validator.isEmail(email)) res.status(400).send({ status: false, message: `${email} is not valid` })
        const author = await authorModel.create(req.body)
        res.status(201).send({ status: true, data: author })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const authorLogin = async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) return res.status(400).send({ status: false , message: 'Please provide email and password' })
        if(! validator.isEmail(email)) res.status(400).send({ status: false, message: `${email} is not valid` })
        const author = await authorModel.findOne({ email: email , password: password})
        if(!author) return res.status(401).send({ status: false, message: 'Invalid email or password' })
        else{
            const token = jwt.sign({
                authorId: author._id,
            }, SECRETE_KEY)
            res.setHeaders('x-api-key', token)
            res.status(200).send({status:true, data: {token:token}})
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {createAuthor, authorLogin}
