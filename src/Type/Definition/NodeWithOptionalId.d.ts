import { Node } from '~/Type/Definition/Node';

/**
 * Node with optional id.
 */
type NodeWithOptionalId = Omit<Node, 'id'> & Pick<Partial<Node>, 'id'>;

export { NodeWithOptionalId };
