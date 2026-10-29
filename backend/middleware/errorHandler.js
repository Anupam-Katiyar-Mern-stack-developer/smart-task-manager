
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // PostgreSQL unique constraint violation
  if (err.code === "23505") {
    statusCode = 409;
    message = "This record already exists";
  }

  // PostgreSQL foreign key violation
  if (err.code === "23503") {
    statusCode = 400;
    message = "Related record does not exist";
  }

  // PostgreSQL not-null violation
  if (err.code === "23502") {
    statusCode = 400;
    message = "Required database field is missing";
  }

  // Log complete error on the server
  console.error("ERROR:", {
    message: err.message,
    statusCode,
    path: req.originalUrl,
    method: req.method,
  });

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
