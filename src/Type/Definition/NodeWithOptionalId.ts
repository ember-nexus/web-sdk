import { Node } from './Node.js';

/**
 * Node with optional id.
 */
type NodeWithOptionalId = Omit<Node, 'id'> & Pick<Partial<Node>, 'id'>;

export { NodeWithOptionalId };
