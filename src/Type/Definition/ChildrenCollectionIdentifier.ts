import { Branded } from '~/Type/Definition/Branded';
import { Uuid } from '~/Type/Definition/Uuid';

/**
 * Branded type primarily used for keys.
 */
type ChildrenCollectionIdentifier = Branded<string, 'COLLECTION_IDENTIFIER'>;

function createChildrenCollectionIdentifier(
  parentUuid: Uuid,
  page: number,
  pageSize: number,
): ChildrenCollectionIdentifier {
  return `children-collection-of-parent-${parentUuid}-page-size-${pageSize}-page-${page}` as ChildrenCollectionIdentifier;
}

export { ChildrenCollectionIdentifier, createChildrenCollectionIdentifier };
