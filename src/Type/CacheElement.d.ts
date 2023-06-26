import { v4 as uuidv4 } from 'uuid';

import Node from '../Type/Node.js';
import Relation from '../Type/Relation.js';

type CacheElement = {
  element: Node | Relation | null;

  parents: Array<typeof uuidv4>;
  nextParentsPage: null | number;

  children: Array<typeof uuidv4>;
  nextChildrenPage: null | number;

  related: Array<typeof uuidv4>;
  nextRelatedPage: null | number;

  firstLoaded: Date;
  lastUpdated: Date;
};

export default CacheElement;
