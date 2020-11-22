//to handle any url that is not an actual route
const notFound = ((req, res, next) => {
  //throwing our own error
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  //to move to next middleware
  next(error);
});


const errorHandler = ((err, req, res, next) => {
  //sending status code 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

export {notFound, errorHandler};