import { Node } from './Node';
import { Relation } from './Relation';

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
