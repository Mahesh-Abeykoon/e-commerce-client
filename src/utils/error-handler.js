/**
 * Centralized error handler for logging and displaying errors.
 * @param {Error} error - The error object.
 * @param {string} message - A custom error message to prepend to the log.
 */
export const handleError = (error, message) => {
    console.error(`${message} ${error.message}`);
  };