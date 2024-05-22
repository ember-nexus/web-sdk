import { Element } from './Element';
import { Uuid } from './Uuid';

type Relation = Element & {
  start: Uuid;
  end: Uuid;
};

export { Relation };
