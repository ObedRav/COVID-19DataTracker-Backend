import { StatusCodes } from 'http-status-codes';
import { NoApiKeyError } from '../utils/errors.js';

// Retrieve and split the authorized API keys from environment variables
const validApiKeys = process.env.API_KEYS_AUTHORIZED?.split(',');

// If no API keys are provided, throw a NoApiKeyError
if (validApiKeys === undefined) {
  throw new NoApiKeyError('No API keys provided');
}

/**
 * Validates an API key in a request header and returns an error if it is not valid.
 *
 * @param {Object} req - The request object containing the headers.
 * @param {Object} res - The response object used to send the error response.
 * @param {Function} next - The next function to call if the API key is valid.
 *
 * @returns {Object|Function} If the `apiKey` is null or not included in the `validApiKeys` array,
 * a JSON response with an error message and a status code of 401 (Unauthorized) is returned.
 * Otherwise, the `next()` function is called to move on to the next middleware function.
 */
export function validateApiKey (req, res, next) {
  const apiKey = req.headers.authorization ?? '';

  if (!validApiKeys.includes(apiKey)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
  }

  next(); // Move on to the next middleware function
}
