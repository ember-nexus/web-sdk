import { Node } from '~/Type/Definition/Node';
import { Relation } from '~/Type/Definition/Relation';

type ElementCollection = {
  elements: Array<Node | Relation>;
};

export { ElementCollection };
