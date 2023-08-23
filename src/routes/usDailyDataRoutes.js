import express from 'express';
import { getAllUsDailyData, getUsDailyDataByDate } from '../controllers/usDailyDataController.js';
import { validateDate } from '../utils/dataValidations.js';

const router = express.Router();

router.get('/daily', getAllUsDailyData);
router.get('/daily/:date', validateDate, getUsDailyDataByDate);

export default router;
