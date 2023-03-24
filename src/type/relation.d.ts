import { v4 as uuidv4 } from 'uuid';

import { Element } from './element.js';

export type Relation = Element & {
  start: typeof uuidv4;
  end: typeof uuidv4;
};
