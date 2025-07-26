import { AppError } from '../utils/AppError.js';

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
