const HttpCodes = require('./constants');

class AuthorizateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizateError';
    this.statusCode = HttpCodes.unAuthorizedError;
  }
}

module.exports = AuthorizateError;
