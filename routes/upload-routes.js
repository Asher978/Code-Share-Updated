const uploadRoutes = require('express').Router();
const passport = require('passport');
const passportConfig = require('../services/auth/jwt');
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../keys/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAcessKey,
  signatureVersion: 'v4',
  region: 'us-east-2'
});

uploadRoutes.get('/image', passport.authenticate('jwt', { session: false }), (req, res) => {

  // generating unique filename for a specific user
  const key = `${req.user.id}/${uuid()}.jpeg`;

  s3.getSignedUrl('putObject', {
    Bucket: 'code-share-users-pics',
    ContentType: 'image/jpeg',
    Key: key
  }, (err, url) => res.send({ key, url }));
});

module.exports = uploadRoutes;