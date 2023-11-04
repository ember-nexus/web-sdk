import type { v4 as uuidv4 } from 'uuid';

import {Element} from './Element.js';

type Relation = Element & {
  start: uuidv4;
  end: uuidv4;
};

export {Relation};
