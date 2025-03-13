// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Internal server error' : err.message;
  
    // Include validation errors if they exist
    const response = { error: message };
    if (err.data) {
      response.details = err.data.map(e => ({ field: e.path, message: e.msg }));
    }
  
    res.status(statusCode).json(response);
  };
  
  module.exports = errorHandler;