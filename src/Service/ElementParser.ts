import { Service } from 'typedi';

import { Node, Relation, validateUuidFromString } from '../Type/Definition/index.js';

/**
 * Class which helps to parse elements.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class ElementParser {
  rawElementToNodeOrRelation(element: object): Node | Relation {
    if (!('id' in element)) {
      throw new Error("Raw element must contain property 'id' in order to be parsed to a node or relation.");
    }
    const id = validateUuidFromString(String(element.id));
    if (!('type' in element)) {
      throw new Error("Raw element must contain property 'type' in order to be parsed to a node or relation.");
    }
    const type = String(element.type);
    if (!('data' in element)) {
      throw new Error("Raw element must contain property 'data' in order to be parsed to a node or relation.");
    }
    const data = element.data as Record<string, unknown>;

    // todo: refactor datetime transformation etc.
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && typeof data[key] === 'string') {
        const dateString = data[key] as string;
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;

        if (dateRegex.test(dateString)) {
          data[key] = new Date(dateString);
        }
      }
    }

    if ('start' in element && 'end' in element) {
      const start = validateUuidFromString(String(element.start));
      const end = validateUuidFromString(String(element.end));
      return {
        id: id,
        start: start,
        end: end,
        type: type,
        data: data,
      } as Relation;
    }
    return {
      id: id,
      type: type,
      data: data,
    } as Node;
  }
}

export { ElementParser };
