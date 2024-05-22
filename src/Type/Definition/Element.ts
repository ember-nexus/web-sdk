import { Data } from './Data';
import { Uuid } from './Uuid';

type Element = {
  type: string;
  id: Uuid;
  data: Data;
};

export { Element };
