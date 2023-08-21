/* The NoApiKeyError class extends the built-in Error class and represents an error related to no provide api keys to the auth.
It adds a custom name, 'NoApiKeyError', to identify errors specifically related to the apikey. */
export class NoApiKeyError extends Error {
  constructor (message) {
    super(message);
    this.name = 'NoApiKeyError';
  }
}
