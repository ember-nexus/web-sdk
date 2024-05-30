import { EmberNexusError } from './EmberNexusError';

/**
 * Base class for errors returned by the API.
 */
class ResponseError extends EmberNexusError {
  private _type: string | null = null;
  private _title: string | null = null;
  private _detail: string | null = null;
  private _status: number | null = null;
  constructor(message?: string) {
    super(message);
  }

  getType(): string | null {
    return this._type;
  }

  setType(value: string): ResponseError {
    this._type = value;
    return this;
  }

  getTitle(): string | null {
    return this._title;
  }

  setTitle(value: string): ResponseError {
    this._title = value;
    return this;
  }

  getDetail(): string | null {
    return this._detail;
  }

  setDetail(value: string): ResponseError {
    this._detail = value;
    return this;
  }

  getStatus(): number | null {
    return this._status;
  }

  setStatus(value: number): ResponseError {
    this._status = value;
    return this;
  }
}

export { ResponseError };
