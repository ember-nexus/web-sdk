import { Node } from './Node.js';
import { Relation } from './Relation.js';

type ElementCollection = {
  id: string;
  totalNodes: number;
  links: {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  };
  elements: Array<Node | Relation>;
};

export { ElementCollection };
