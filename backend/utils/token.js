/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

const generateToken = (payload) => jwt.sign(payload, 'dev_secret', {
  expiresIn: 1209600,
});

module.exports = generateToken;
