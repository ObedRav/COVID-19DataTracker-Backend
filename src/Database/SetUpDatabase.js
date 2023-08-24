import axios from 'axios';
import sequelize from './Database.js';
import StateDailyData from '../models/StateDailyData.js';
import UsDailyData from '../models/UsDailyData.js';
import stateCodes from './Data/states.js';

/**
 * Retrieves COVID-19 data for the US from an API and populates a database table with the data.
 * This function is asynchronous.
 */
async function populateUsDailyData () {
  try {
    const response = await axios.get('https://api.covidtracking.com/v2/us/daily/simple.json');
    const covidData = response.data.data;

    for (const record of covidData) {
      // Destructure data from the API response
      const { date, states, cases, testing, outcomes } = record;

      // Handle null values before accessing properties
      const totalCases = cases?.total ?? null;
      const totalTesting = testing?.total ?? null;
      const hospitalizedCurrently = outcomes?.hospitalized?.currently ?? null;
      const inIcuCurrently = outcomes?.hospitalized?.in_icu?.currently ?? null;
      const onVentilatorCurrently = outcomes?.hospitalized?.on_ventilator?.currently ?? null;
      const totalDeaths = outcomes?.death?.total ?? null;

      // Create a new record in the UsDailyData table
      await UsDailyData.create({
        date,
        states,
        total_cases: totalCases,
        total_testing: totalTesting,
        hospitalized_currently: hospitalizedCurrently,
        in_icu_currently: inIcuCurrently,
        on_ventilator_currently: onVentilatorCurrently,
        total_deaths: totalDeaths
      });
    }

    console.log('us_daily_data table populated successfully');
  } catch (error) {
    console.error('Error populating us_daily_data table:', error);
  }
}

/**
 * Populates a database table with COVID-19 data for each state using an API.
 * This function is asynchronous.
 */
async function populateStateDailyData () {
  try {
    for (const stateCode in stateCodes) {
      const stateName = stateCodes[stateCode];
      const response = await axios.get(`https://api.covidtracking.com/v2/states/${stateCode}/daily/simple.json`);
      const stateData = response.data.data;

      for (const record of stateData) {
        // Destructure data from the API response
        const {
          date,
          cases: { total: totalCases },
          tests: { pcr: { total: totalTesting } },
          outcomes: {
            hospitalized: {
              currently: hospitalizedCurrently,
              in_icu: { currently: inIcuCurrently },
              on_ventilator: { currently: onVentilatorCurrently }
            },
            death: { total: totalDeaths }
          }
        } = record;

        // Create a new record in the StateDailyData table
        await StateDailyData.create({
          date,
          stateCode,
          stateName,
          total_cases: totalCases,
          total_testing: totalTesting,
          hospitalized_currently: hospitalizedCurrently,
          in_icu_currently: inIcuCurrently,
          on_ventilator_currently: onVentilatorCurrently,
          total_deaths: totalDeaths
        });
      }

      console.log(`state_daily_data table populated for state ${stateName}`);
    }
  } catch (error) {
    console.error('Error populating state_daily_data table:', error);
  }
}

/**
 * Sets up the database by synchronizing models with the database schema, populating data,
 * and closing the connection.
 * This function is asynchronous.
 */
async function setupDatabase () {
  try {
    await sequelize.sync(); // Synchronize models with the database schema
    await populateUsDailyData();
    await populateStateDailyData();
    sequelize.close(); // Close the connection after populating data
    console.log('Database setup completed successfully.');
  } catch (error) {
    console.error('Error setting up the database:', error);
    sequelize.close(); // Close the connection in case of an error
  }
}

setupDatabase();
