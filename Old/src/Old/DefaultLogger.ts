import LoggerInterface from './Type/LoggerInterface.js';
/* eslint @typescript-eslint/no-unused-vars: 0 */

export default class DefaultLogger implements LoggerInterface {
  debug(..._args: unknown[]): unknown | undefined {
    return undefined;
  }

  error(..._args: unknown[]): unknown | undefined {
    return undefined;
  }

  info(..._args: unknown[]): unknown | undefined {
    return undefined;
  }

  warn(..._args: unknown[]): unknown | undefined {
    return undefined;
  }
}
