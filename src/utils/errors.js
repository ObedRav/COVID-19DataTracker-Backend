/* The NotFound class extends the built-in Error class and represents an error for when a resource is not found.
It is typically used to indicate that a requested resource could not be located. */
export class NotFound extends Error {
  /**
   * Creates a new NotFound error with the specified error message.
   *
   * @param {string} message - The error message to be associated with the NotFound error.
   */
  constructor (message) {
    super(message);
    this.name = 'NotFound';
  }
}

/* The DatabaseError class extends the built-in Error class and represents an error related to database operations.
It adds a custom name, 'DatabaseError', to identify errors specifically related to the database. */
export class DatabaseError extends Error {
  /**
   * Creates a new DatabaseError with the specified error message.
   *
   * @param {string} message - The error message to be associated with the DatabaseError.
   */
  constructor (message) {
    super(message);
    this.name = 'DatabaseError';
  }
}

/* The NoApiKeyError class extends the built-in Error class and represents an error related to no provide api keys to the auth.
It adds a custom name, 'NoApiKeyError', to identify errors specifically related to the apikey. */
export class NoApiKeyError extends Error {
  /**
   * Creates a new NoApiKeyError with the specified error message.
   *
   * @param {string} message - The error message to be associated with the NoApiKeyError.
   */
  constructor (message) {
    super(message);
    this.name = 'NoApiKeyError';
  }
}

/* The CredentialsError class extends the built-in Error class and represents an error related to wrong credentials in the database.
It adds a custom name, 'CredentialsError', to identify errors specifically related the database connection. */
export class CredentialsError extends Error {
  /**
   * Creates a new CredentialsError with the specified error message.
   *
   * @param {string} message - The error message to be associated with the CredentialsError.
   */
  constructor (message) {
    super(message);
    this.name = 'CredentialsError';
  }
}
