module.exports = function(err, req, res, next) {
    let statusCode;
    let message;

    console.log(err);
  
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      statusCode = 400;
      message = 'Invalid JSON payload';
    } else if (err.name === 'UnauthorizedError') {
      statusCode = 401;
      message = 'Invalid token';
    } else if (err.name === 'ForbiddenError') {
      statusCode = 403;
      message = 'Forbidden';
    } else if (err.name === 'NotFoundError') {
      statusCode = 404;
      message = 'Not Found';
    } else {
      statusCode = 500;
      message = 'Internal server error';
    }
  
    res.status(statusCode).json({ message });
}