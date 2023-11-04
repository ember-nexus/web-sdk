interface LoggerInterface {
  debug(...args: unknown[]): unknown | undefined;
  info(...args: unknown[]): unknown | undefined;
  warn(...args: unknown[]): unknown | undefined;
  error(...args: unknown[]): unknown | undefined;
}

export {LoggerInterface};
