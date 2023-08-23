import axios from 'axios';
import sequelize from './Database.js';
import StateDailyData from '../models/StateDailyData.js';
import UsDailyData from '../models/UsDailyData.js';
import stateCodes from './Data/states.js';

async function populateUsDailyData () {
  try {
    const response = await axios.get('https://api.covidtracking.com/v2/us/daily/simple.json');
    const covidData = response.data.data;

    for (const record of covidData) {
      const { date, states, cases, testing, outcomes } = record;

      // Check for null values before accessing properties
      const totalCases = cases?.total ?? null;
      const totalTesting = testing?.total ?? null;
      const hospitalizedCurrently = outcomes?.hospitalized?.currently ?? null;
      const inIcuCurrently = outcomes?.hospitalized?.in_icu?.currently ?? null;
      const onVentilatorCurrently = outcomes?.hospitalized?.on_ventilator?.currently ?? null;
      const totalDeaths = outcomes?.death?.total ?? null;

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

async function populateStateDailyData () {
  try {
    for (const stateCode in stateCodes) {
      const stateName = stateCodes[stateCode];
      const response = await axios.get(`https://api.covidtracking.com/v2/states/${stateCode}/daily/simple.json`);
      const stateData = response.data.data;

      for (const record of stateData) {
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

async function setupDatabase () {
  try {
    await sequelize.sync(); // This synchronizes your models with the database schema
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
