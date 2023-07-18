import Node from './Node.js';
import Relation from './Relation.js';

type PartialUnifiedCollection = {
  type: '_PartialUnifiedCollection';
  id: string;
  totalElements: number;
  links: {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  };
  elements: Array<Node | Relation>;
};

export default PartialUnifiedCollection;
