import Sequelize from 'sequelize';
import { CredentialsError, DatabaseError } from '../utils/errors.js';

// Obtaining env variables for the connection
const DATABASE_NAME = process.env.DATABASE_NAME ?? 'covid19datatracker_dev_db';
const DATABASE_USER = process.env.DATABASE_USER ?? 'user';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? 'user_dev_pwd';
const DATABASE_HOST = process.env.DATABASE_HOST ?? 'localhost';

// Create Sequelize instance
const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: 'mysql',
  logging: false // Disable logging queries in console
});

/**
 * This function connects to the MySQL database.
 */
export async function connectDatabase () {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database');
  } catch (error) {
    throw new CredentialsError(`Failed to connect to MySQL database: ${error.message}`);
  }
}

/**
 * This function checks if the database is connected and attempts to connect if it is not.
 */
export async function checkDatabase () {
  try {
    if (!sequelize.isConnected) {
      await connectDatabase();
    }
  } catch (err) {
    throw new DatabaseError(`There was an error calling the function to connect to the database: ${err}`);
  }
}

export default sequelize;
