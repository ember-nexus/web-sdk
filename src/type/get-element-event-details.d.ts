import { v4 as uuidv4 } from 'uuid';

import Node from './node.js';
import Relation from './relation.js';

type GetElementEventDetails = {
  uuid: typeof uuidv4;
  cacheOnly: boolean;
  element: Promise<Node | Relation> | null;
};

export default GetElementEventDetails;
