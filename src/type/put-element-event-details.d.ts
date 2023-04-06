import { v4 as uuidv4 } from 'uuid';

import Node from './node.js';
import Relation from './relation.js';

type PutElementEventDetails = {
  uuid: typeof uuidv4;
  data: Record<string, unknown>;
  loadNewData: boolean;
  element: Promise<Node | Relation | void> | null;
};

export default PutElementEventDetails;
