import { StatusCodes } from 'http-status-codes';
// Import custom error classes
import { DatabaseError, NotFound } from '../utils/errors.js';

/**
 * Handles different types of errors and returns an appropriate response with an error message.
 *
 * @param {Error} err - The error object that was thrown or passed to the error handler function.
 * @param {Object} _req - The request object in an Express middleware function.
 * @param {Object} res - The response object used to send the HTTP response back to the client.
 * @param {Function} _next - The reference to the next middleware function in the request-response cycle.
 *
 * @returns {Object} A response object with a status code and a JSON object containing an error message.
 * The specific status code and error message depend on the type of error being handled.
 */
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
