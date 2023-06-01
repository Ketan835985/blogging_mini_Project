const express = require('express')
const app = express()
const mongoose = require('mongoose')
const trafficPoint = require('./route/route')
const { PORT, MONGOOSE_CONNECTION } = require('../config')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


mongoose.connect(MONGOOSE_CONNECTION,
    { useNewUrlParser: true }
)
    .then(() => console.log("connected"))
    .catch((err) => console.log(err.message))

app.use('/', trafficPoint)

app.listen(PORT || 8000, function () {
    console.log("listening on port",PORT || 8000)
})