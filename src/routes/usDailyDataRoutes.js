import express from 'express';
import { getAllUsDailyData, getUsDailyDataByDate, getUsTopsData } from '../controllers/usDailyDataController.js';
import { validateDate } from '../middleware/dataValidations.js';

const router = express.Router();

/**
 * Route: GET /daily
 * Controller: getAllUsDailyData
 *
 * This route retrieves all US data from the database and sends it as a JSON response.
 */
router.get('/us/daily', getAllUsDailyData);

/**
 * Route: GET /daily/:date
 * Middleware: validateDate
 * Controller: getUsDailyDataByDate
 *
 * This route retrieves US data by a specified date and sends a JSON response with the data if found,
 * or an error message if not found or if there is a database error.
 */
router.get('/us/daily/:date', validateDate, getUsDailyDataByDate);

/**
 * Route: GET /states/tops
 * Controller: getStatesTopsData
 *
 * This route retrieves the top date and state of the total cases, total deaths, total testing
 */
router.get('/us/tops', getUsTopsData);

export default router;
