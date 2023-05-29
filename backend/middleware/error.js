export default function (err, req, res, next) {
  const statusCode = err.statusCode || 400;
  const errorResponse = {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  };
  console.log(errorResponse);
  res.status(statusCode).json(errorResponse);
}
