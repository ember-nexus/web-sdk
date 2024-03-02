class NetworkError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'NetworkError';
    this.cause = originalError;
  }
}

export { NetworkError };
