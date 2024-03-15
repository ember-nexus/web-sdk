import { LoggerInterface } from '~/Type/Definition/LoggerInterface';

class TestLogger implements LoggerInterface {
  private debugCalls: unknown[][] = [];
  private errorCalls: unknown[][] = [];
  private infoCalls: unknown[][] = [];
  private warnCalls: unknown[][] = [];

  debug(...args: unknown[]): unknown | undefined {
    this.debugCalls.push([...args]);
    return undefined;
  }

  error(...args: unknown[]): unknown | undefined {
    this.errorCalls.push([...args]);
    return undefined;
  }

  info(...args: unknown[]): unknown | undefined {
    this.infoCalls.push([...args]);
    return undefined;
  }

  warn(...args: unknown[]): unknown | undefined {
    this.warnCalls.push([...args]);
    return undefined;
  }

  assertDebugHappened(message: string): boolean {
    for (let i = 0; i < this.debugCalls.length; i++) {
      if (this.debugCalls[i][0] === message) {
        return true;
      }
    }
    return false;
  }

  assertErrorHappened(message: string): boolean {
    for (let i = 0; i < this.errorCalls.length; i++) {
      if (this.errorCalls[i][0] === message) {
        return true;
      }
    }
    return false;
  }

  assertInfoHappened(message: string): boolean {
    for (let i = 0; i < this.infoCalls.length; i++) {
      if (this.infoCalls[i][0] === message) {
        return true;
      }
    }
    return false;
  }

  assertWarnHappened(message: string): boolean {
    for (let i = 0; i < this.warnCalls.length; i++) {
      if (this.warnCalls[i][0] === message) {
        return true;
      }
    }
    return false;
  }

  printAllCalls(): void {
    console.log(this.debugCalls);
    console.log(this.errorCalls);
    console.log(this.infoCalls);
    console.log(this.warnCalls);
  }
}

export { TestLogger };
