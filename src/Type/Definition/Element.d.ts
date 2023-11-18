import { Uuid } from '~/Type/Definition/Uuid';

type Element = {
  type: string;
  id: Uuid;
  data: object;
};

export { Element };
