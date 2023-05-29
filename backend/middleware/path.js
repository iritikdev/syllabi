export default function (req, res, next) {
  const error = new Error("Invalid Routes");
  error.statusCode = 400;
  next(error);
}
