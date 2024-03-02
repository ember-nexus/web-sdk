import { Data } from '~/Type/Definition/Data';
import { Uuid } from '~/Type/Definition/Uuid';

type Element = {
  type: string;
  id: Uuid;
  data: Data;
};

export { Element };
