import { StatusCodes } from 'http-status-codes';
// import errors
import { DatabaseError, NotFound } from '../utils/errors.js';

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof NotFound) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
  }
  if (err instanceof DatabaseError) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ error: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'An internal server error occurred. Please try again later.',
    message: err.message
  });
};

export default errorHandler;
