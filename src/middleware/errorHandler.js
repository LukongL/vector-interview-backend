const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Handle specific error types
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource ID format';
  }

  // Handle validation errors from mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    err.data = Object.values(err.errors).map(e => ({ 
      field: e.path, 
      message: e.message 
    }));
  }

  const response = {
    error: message,
    ...(err.data && { details: err.data })
  };

  // Send response
  res.status(statusCode).json(response);
};

module.exports = errorHandler;