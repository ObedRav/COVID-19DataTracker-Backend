import StateDailyData from '../models/StateDailyData.js';
import { DatabaseError, NotFound } from '../utils/errors.js';

/**
 * Retrieves all data for a specific state from the database and sends it as a JSON response.
 */
export const getAllStateDailyData = async (req, res, next) => {
  const stateCode = req.params.stateCode;

  try {
    const stateData = await StateDailyData.findAll({
      where: { stateCode }
    });

    res.json(stateData);
  } catch (error) {
    throw new DatabaseError('Database Error', error);
  }
};

/**
 * Retrieves data for a specific state and date from the database and sends it as a JSON response.
 */
export const getStateDailyDataByDate = async (req, res) => {
  const stateCode = req.params.stateCode;
  const date = req.params.date;

  try {
    const data = await StateDailyData.findOne({
      where: {
        stateCode,
        date
      }
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
