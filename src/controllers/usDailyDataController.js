import UsDailyData from '../models/UsDailyData.js';
import { DatabaseError, NotFound } from '../utils/errors.js';

/**
 * Retrieves all US data from the database and sends it as a JSON response.
 *
 * @param {Object} _req - The request object (not used in this function).
 * @param {Object} res - The response object used to send the response back to the client.
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
 *
 * @param {Object} req - The request object containing details about the HTTP request made by the client.
 * @param {Object} res - The response object used to send the response back to the client.
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

export const getUsTopsData = async (_req, res) => {
  try {
    const usTops = await UsDailyData.findAll({
      attributes: ['date', 'total_cases', 'total_deaths', 'total_testing'],
      order: [['total_cases', 'DESC'], ['total_deaths', 'DESC'], ['total_testing', 'DESC']],
      limit: 3
    });

    res.json(usTops);
  } catch (error) {
    throw new DatabaseError('Database Error', error);
  }
};
