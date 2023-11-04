import { v4 as uuidv4 } from 'uuid';

import Element from './Element.js';

type Relation = Element & {
  start: typeof uuidv4;
  end: typeof uuidv4;
};

export default Relation;
