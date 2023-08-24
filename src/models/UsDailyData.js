import { DataTypes } from 'sequelize';
import sequelize from '../Database/Database.js';

/**
 * The `UsDailyData` model represents a table in the database for storing daily COVID-19 data for the entire US.
 * It defines the structure of the table including its columns, data types, and constraints.
 */
const UsDailyData = sequelize.define('us_daily_data', {
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true
  },
  states: {
    type: DataTypes.INTEGER
  },
  total_cases: {
    type: DataTypes.INTEGER
  },
  total_testing: {
    type: DataTypes.INTEGER
  },
  hospitalized_currently: {
    type: DataTypes.INTEGER
  },
  in_icu_currently: {
    type: DataTypes.INTEGER
  },
  on_ventilator_currently: {
    type: DataTypes.INTEGER
  },
  total_deaths: {
    type: DataTypes.INTEGER
  }
});

export default UsDailyData;
