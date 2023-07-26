const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3({apiVersion : "v3"});

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const params = {
      ACL: "public-read",
      Bucket: process.env.AWS_BUCKET,
      Key: `abc/${file.originalname}`,
      Body: file.buffer,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}

module.exports = uploadFile;
