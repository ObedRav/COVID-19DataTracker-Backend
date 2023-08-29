import express from 'express';
import { getAllStateDailyData, getStateDailyDataByDate, getStates } from '../controllers/stateDailyDataController.js';
import { validateDate, validateStateCode } from '../middleware/dataValidations.js';

const router = express.Router();

/**
 * Route: GET /states/:stateCode/daily
 * Middleware: validateStateCode
 * Controller: getAllStateDailyData
 *
 * This route retrieves all data for a specific state from the database and sends it as a JSON response.
 */
router.get('/states/:stateCode/daily', validateStateCode, getAllStateDailyData);

/**
 * Route: GET /states/:stateCode/:date
 * Middleware: validateStateCode, validateDate
 * Controller: getStateDailyDataByDate
 *
 * This route retrieves data for a specific state and date from the database and returns it as a JSON response.
 */
router.get('/states/:stateCode/:date', validateStateCode, validateDate, getStateDailyDataByDate);

/**
 * Route: GET /states
 * Controller: getStates
 *
 * This route retrieves all the posible states as a JSON response.
 */
router.get('/states', getStates);

export default router;
