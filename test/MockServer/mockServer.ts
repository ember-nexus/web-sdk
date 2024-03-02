// eslint-disable-next-line import/no-unresolved
import { setupServer } from 'msw/node';

import { getElementErrorNetworkResponse } from './Element/GetElement/getElementErrorNetworkResponse';
import { getElementNormal200Response } from './Element/GetElement/getElementNormal200Response';
import { getElementUnauthorized401Response } from './Element/GetElement/getElementUnauthorized401Response';

const mockServer = setupServer(
  getElementNormal200Response,
  getElementErrorNetworkResponse,
  getElementUnauthorized401Response,
);

export { mockServer };
