const HttpCodes = require('./constants');

class DeleteError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DeleteError';
    this.statusCode = HttpCodes.deleteError;
  }
}

module.exports = DeleteError;
