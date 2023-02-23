import { Node } from './node.js';
import { Relation } from './relation.js';

export type PartialCollection = {
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
