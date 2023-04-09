import { SetupServer, setupServer } from 'msw/node';

import handlers from './handlers.js';

const server: SetupServer = setupServer(...handlers);
export default server;
