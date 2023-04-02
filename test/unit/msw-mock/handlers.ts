import { RestHandler } from 'msw';

import { dataNodeHandlers } from './handlers/data-node-handler.js';
import { forbiddenHandlers } from './handlers/forbidden-handler.js';
import { malformedDataNodeHandlers } from './handlers/malformed-data-node-handler.js';
import { notFoundHandlers } from './handlers/not-found-handler.js';

export const handlers: RestHandler[] = [
  ...dataNodeHandlers,
  ...malformedDataNodeHandlers,
  ...notFoundHandlers,
  ...forbiddenHandlers,
];
