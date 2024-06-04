import { Element } from './Element.js';
import { Uuid } from './Uuid.js';

type Relation = Element & {
  start: Uuid;
  end: Uuid;
};

export { Relation };
