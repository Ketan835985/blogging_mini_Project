const dotenv = require('dotenv').config();

const {PORT, MONGOOSE_CONNECTION, SECRETE_KEY } = process.env


module.exports = {PORT : PORT, MONGOOSE_CONNECTION  : MONGOOSE_CONNECTION, SECRETE_KEY : SECRETE_KEY}