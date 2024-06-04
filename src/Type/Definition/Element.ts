import { Data } from './Data.js';
import { Uuid } from './Uuid.js';

type Element = {
  type: string;
  id: Uuid;
  data: Data;
};

export { Element };
