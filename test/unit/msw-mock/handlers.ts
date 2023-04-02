import { RestHandler } from 'msw';

import { childrenHandler } from './handlers/children-handler.js';
import { dataNodeHandlers } from './handlers/data-node-handler.js';
import { forbiddenHandlers } from './handlers/forbidden-handler.js';
import { indexHandler } from './handlers/index-handler.js';
import { malformedDataNodeHandlers } from './handlers/malformed-data-node-handler.js';
import { notFoundHandlers } from './handlers/not-found-handler.js';
import { parentsHandler } from './handlers/parents-handler.js';
import { relatedHandler } from './handlers/related-handler.js';

export const handlers: RestHandler[] = [
  ...dataNodeHandlers,
  ...malformedDataNodeHandlers,
  ...notFoundHandlers,
  ...forbiddenHandlers,
  ...childrenHandler,
  ...parentsHandler,
  ...relatedHandler,
  ...indexHandler,
];
