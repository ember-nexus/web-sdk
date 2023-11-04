import { v4 as uuidv4 } from 'uuid';

import Node from '../Type/Node.js';
import Relation from '../Type/Relation.js';

type CacheElement = {
  element: Node | Relation | null;

  parents: Array<typeof uuidv4>;
  allParentsLoaded: boolean;

  children: Array<typeof uuidv4>;
  allChildrenLoaded: boolean;

  related: Array<typeof uuidv4>;
  allRelatedLoaded: boolean;

  firstLoaded: Date;
  lastUpdated: Date;
};

export default CacheElement;
