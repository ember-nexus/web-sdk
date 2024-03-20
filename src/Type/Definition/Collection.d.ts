import { Node } from '~/Type/Definition/Node';
import { Relation } from '~/Type/Definition/Relation';

type Collection = {
  id: string;
  totalNodes: number;
  links: {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  };
  nodes: Array<Node>;
  relations: Array<Relation>;
};

export { Collection };
