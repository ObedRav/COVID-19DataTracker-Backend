import express from 'express';
import { getAllStateDailyData, getStateDailyDataByDate } from '../controllers/stateDailyDataController.js';
import { validateDate, validateStateCode } from '../utils/dataValidations.js';

const router = express.Router();

router.get('/states/:stateCode/daily', validateStateCode, getAllStateDailyData);
router.get('/states/:stateCode/:date', validateStateCode, validateDate, getStateDailyDataByDate);

export default router;
