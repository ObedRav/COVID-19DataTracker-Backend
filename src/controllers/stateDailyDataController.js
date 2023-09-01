import StateDailyData from '../models/StateDailyData.js';
import { DatabaseError, NotFound } from '../utils/errors.js';
import statesData from '../Database/Data/states.js';
import { invertObject } from '../middleware/helperFunctions.js';

/**
  * Retrieves all daily data for a specific state from the database
  * and sends it as a JSON response.
  *
  * @param {Object} req - The request object containing details about the HTTP request made by the client.
  * @param {Object} res - The response object used to send the response back to the client.
  */
export const getAllStateDailyData = async (req, res) => {
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
 * Retrieves data for a specific state and date from a
 * database and returns it as a JSON response.
 *
 * @param {Object} req - The request object containing details about the HTTP request made by the client.
 * @param {Object} res - The response object used to send the response back to the client.
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

/**
 * Retrieves the state codes and names
 *
 * @param {Object} req - The request object containing details about the HTTP request made by the client.
 * @param {Object} res - The response object used to send the response back to the client.
 * @returns an array of arrays, where each inner array contains the state code and state name.
 */
export const getStates = (_req, res) => {
  res.json(invertObject(statesData));
};

/**
 * Retrieves the top 3 states with the highest total cases, total
 * deaths, and total testing from a database table and sends the data as a JSON
 * response.
 * @param {Object} req - The request object containing details about the HTTP request made by the client.
 * @param {Object} res - The response object used to send the response back to the client.
 */
export const getStatesTopsData = async (_req, res) => {
  try {
    const statesTops = await StateDailyData.findAll({
      attributes: ['stateCode', 'stateName', 'date', 'total_cases', 'total_deaths', 'total_testing'],
      order: [['total_cases', 'DESC'], ['total_deaths', 'DESC'], ['total_testing', 'DESC']],
      limit: 3
    });

    res.json(statesTops);
  } catch (error) {
    throw new DatabaseError('Database Error', error);
  }
};
