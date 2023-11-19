import { Node } from '~/Type/Definition/Node';

type NodeWithOptionalId = Omit<Node, 'id'> & Pick<Partial<Node>, 'id'>;

export { NodeWithOptionalId };
