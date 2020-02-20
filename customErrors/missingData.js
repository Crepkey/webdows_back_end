class MissingData extends Error {
  constructor(message = "A necessary data is missing", ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingData);
    }

    // Custom debugging information
    this.name = "MissingData";
    this.message = message;
    this.date = new Date();
  }
}

module.exports = MissingData;
