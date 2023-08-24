import { DataTypes } from 'sequelize';
import sequelize from '../Database/Database.js';

/**
 * The `StateDailyData` model represents a table in the database for storing daily COVID-19 data for each state.
 * It defines the structure of the table including its columns, data types, and constraints.
 */
const StateDailyData = sequelize.define('state_daily_data', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  stateCode: {
    type: DataTypes.STRING(3),
    allowNull: false
  },
  stateName: {
    type: DataTypes.STRING(256),
    allowNull: false
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

export default StateDailyData;
