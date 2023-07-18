import Node from './Node.js';
import Relation from './Relation.js';

type SearchEventDetails = {
  payload: Record<string, unknown>;
  page: number;
  elements: Promise<Array<Node | Relation>> | null;
};

export default SearchEventDetails;
