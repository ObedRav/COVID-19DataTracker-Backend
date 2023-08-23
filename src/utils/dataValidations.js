import { StatusCodes } from 'http-status-codes';
import statesData from '../Database/Data/states.js';

function isValidDateFormat (dateString) {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(dateString);
}

export function validateDate (req, res, next) {
  const { date } = req.params;

  if (!isValidDateFormat(date)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid date format. Please use AAAA-MM-DD format.' });
  }

  next();
}

export function validateStateCode (req, res, next) {
  const { stateCode } = req.params;

  if (!statesData[stateCode]) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid state code.' });
  }

  next();
}
