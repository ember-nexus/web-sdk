// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';

import { getElementBadResponse } from './Element/GetElement/getElementBadResponse';
import { getElementErrorNetworkResponse } from './Element/GetElement/getElementErrorNetworkResponse';
import { getElementNoContentTypeResponse } from './Element/GetElement/getElementNoContentTypeResponse';
import { getElementNormal200Response } from './Element/GetElement/getElementNormal200Response';
import { getElementNotFound404Response } from './Element/GetElement/getElementNotFound404Response';
import { getElementTooManyRequests429Response } from './Element/GetElement/getElementTooManyRequests429Response';
import { getElementUnauthorized401Response } from './Element/GetElement/getElementUnauthorized401Response';

const mockServer = setupServer(
  getElementNormal200Response,
  getElementErrorNetworkResponse,
  getElementBadResponse,
  getElementNoContentTypeResponse,
  getElementUnauthorized401Response,
  getElementNotFound404Response,
  getElementTooManyRequests429Response,
);

export { mockServer };
