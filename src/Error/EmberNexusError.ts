/**
 * Base class for errors generated by the Web SDK.
 */
class EmberNexusError extends Error {
  constructor(message) {
    super(message);
  }
}

export { EmberNexusError };
