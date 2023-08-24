import express from 'express';
import { getAllUsDailyData, getUsDailyDataByDate } from '../controllers/usDailyDataController.js';
import { validateDate } from '../middleware/dataValidations.js';

const router = express.Router();

/**
 * Route: GET /daily
 * Controller: getAllUsDailyData
 *
 * This route retrieves all US data from the database and sends it as a JSON response.
 */
router.get('/daily', getAllUsDailyData);

/**
 * Route: GET /daily/:date
 * Middleware: validateDate
 * Controller: getUsDailyDataByDate
 *
 * This route retrieves US data by a specified date and sends a JSON response with the data if found,
 * or an error message if not found or if there is a database error.
 */
router.get('/daily/:date', validateDate, getUsDailyDataByDate);

export default router;
