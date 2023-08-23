import UsDailyData from '../models/UsDailyData.js';
import { DatabaseError, NotFound } from '../utils/errors.js';

/**
 * Retrieves all US data from the database and sends it as a JSON response, handling any errors that occur.
 */
export const getAllUsDailyData = async (_req, res) => {
  try {
    const allData = await UsDailyData.findAll();
    res.json(allData);
  } catch (error) {
    throw new DatabaseError('Database Error', error);
  }
};

/**
 * Retrieves US data by a specified date and sends a JSON response with the data if found,
 * or an error message if not found or if there is a database error.
 */
export const getUsDailyDataByDate = async (req, res) => {
  const date = req.params.date;

  try {
    const data = await UsDailyData.findOne({
      where: { date }
    });

    if (data) {
      res.json(data);
    } else {
      throw new NotFound('Data not found');
    }
  } catch (error) {
    throw new DatabaseError('Database Error', error);
  }
};
