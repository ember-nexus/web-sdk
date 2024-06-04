import { Node } from './Node.js';
import { Relation } from './Relation.js';

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
