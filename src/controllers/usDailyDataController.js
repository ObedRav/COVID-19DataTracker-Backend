import UsDailyData from '../models/UsDailyData.js';
import { DatabaseError, NotFound } from '../utils/errors.js';
import { checkDatabase } from '../Database/Database.js';

/**
 * Retrieves all US data from the database and sends it as a JSON response.
 *
 * @param {Object} _req - The request object (not used in this function).
 * @param {Object} res - The response object used to send the response back to the client.
 */
export const getAllUsDailyData = async (_req, res) => {
  checkDatabase();

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
  checkDatabase();

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
