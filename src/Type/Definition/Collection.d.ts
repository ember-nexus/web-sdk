import { Node } from '~/Type/Definition/Node';
import { Relation } from '~/Type/Definition/Relation';

type Collection = {
  nodes: Array<Node>;
  relations: Array<Relation>;
};

export { Collection };
