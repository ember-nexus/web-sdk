import { Element } from './element.js';
import { v4 as uuidv4 } from 'uuid';

export type Relation = Element & {
  start: typeof uuidv4;
  end: typeof uuidv4;
};
