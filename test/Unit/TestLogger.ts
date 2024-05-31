import { LoggerInterface } from '../../src/Type/Definition';

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

  assertDebugHappened(message: string, assertTimes: number = 1): boolean {
    let timesHappened = 0;
    for (let i = 0; i < this.debugCalls.length; i++) {
      if (this.debugCalls[i][0] === message) {
        timesHappened++;
      }
    }
    return assertTimes === timesHappened;
  }

  assertErrorHappened(message: string, assertTimes: number = 1): boolean {
    let timesHappened = 0;
    for (let i = 0; i < this.errorCalls.length; i++) {
      if (this.errorCalls[i][0] === message) {
        timesHappened++;
      }
    }
    return assertTimes === timesHappened;
  }

  assertInfoHappened(message: string, assertTimes: number = 1): boolean {
    let timesHappened = 0;
    for (let i = 0; i < this.infoCalls.length; i++) {
      if (this.infoCalls[i][0] === message) {
        timesHappened++;
      }
    }
    return assertTimes === timesHappened;
  }

  assertWarnHappened(message: string, assertTimes: number = 1): boolean {
    let timesHappened = 0;
    for (let i = 0; i < this.warnCalls.length; i++) {
      if (this.warnCalls[i][0] === message) {
        timesHappened++;
      }
    }
    return assertTimes === timesHappened;
  }

  assertNoCallsHappened(): boolean {
    return (
      this.debugCalls.length === 0 &&
      this.errorCalls.length === 0 &&
      this.infoCalls.length === 0 &&
      this.warnCalls.length === 0
    );
  }

  assertNoDebugHappened(): boolean {
    return this.debugCalls.length === 0;
  }

  assertNoErrorHappened(): boolean {
    return this.errorCalls.length === 0;
  }

  assertNoInfoHappened(): boolean {
    return this.infoCalls.length === 0;
  }

  assertNoWarnHappened(): boolean {
    return this.warnCalls.length === 0;
  }

  printAllCalls(): void {
    console.log(this.debugCalls);
    console.log(this.errorCalls);
    console.log(this.infoCalls);
    console.log(this.warnCalls);
  }
}

export { TestLogger };
