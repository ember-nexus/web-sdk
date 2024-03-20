import { Element } from '~/Type/Definition/Element';
import { Uuid } from '~/Type/Definition/Uuid';

type Relation = Element & {
  start: Uuid;
  end: Uuid;
};

export { Relation };
