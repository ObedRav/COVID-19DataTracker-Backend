import { StatusCodes } from 'http-status-codes';
import statesData from '../Database/Data/states.js';

/**
 * Checks if a given string follows the format "YYYY-MM-DD" and returns true if it does,
 * and false otherwise.
 *
 * @param {string} dateString - A string representing a date in the format "YYYY-MM-DD".
 * @returns {boolean} A boolean indicating whether the input string matches the format of a valid date (YYYY-MM-DD).
 */
function isValidDateFormat (dateString) {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(dateString);
}

/**
 * Validates the format of a date parameter and returns an error response if the format is invalid.
 *
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {Function} next - The next function to call if the date format is valid.
 *
 * @returns {Object|Function} If the date format is not valid, a response with a status code of 400 (Bad Request)
 * and an error message will be returned. If the date format is valid, the `next()` function will be called,
 * indicating that the validation was successful and the request can proceed to the next middleware or route handler.
 */
export function validateDate (req, res, next) {
  const { date } = req.params;

  if (!isValidDateFormat(date)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid date format. Please use AAAA-MM-DD format.' });
  }

  next();
}

/**
 * Validates a state code by checking if it exists in a statesData object and returns an error message if it is invalid.
 *
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send the response back to the client.
 * @param {Function} next - The next function to call if the state code is valid.
 *
 * @returns {Object|Function} If the `stateCode` does not exist in the `statesData` object, a response with a
 * status code of `400` (Bad Request) and a JSON object containing an error message will be returned. If the
 * state code is valid, the `next()` function will be called, indicating that the validation was successful
 * and the request can proceed to the next middleware or route handler.
 */
export function validateStateCode (req, res, next) {
  const { stateCode } = req.params;

  if (!statesData[stateCode]) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid state code.' });
  }

  next();
}
