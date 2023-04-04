import Node from './node.js';
import Relation from './relation.js';

type PartialCollection = {
  type: '_PartialCollection';
  id: string;
  totalNodes: number;
  links: {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  };
  nodes: Node[];
  relations: Relation[];
};

export default PartialCollection;
