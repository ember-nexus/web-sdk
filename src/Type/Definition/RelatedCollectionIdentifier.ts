import { Branded } from '~/Type/Definition/Branded';
import { Uuid } from '~/Type/Definition/Uuid';

/**
 * Branded type primarily used for keys.
 */
type RelatedCollectionIdentifier = Branded<string, 'COLLECTION_IDENTIFIER'>;

function createRelatedCollectionIdentifier(
  centerUuid: Uuid,
  page: number,
  pageSize: number,
): RelatedCollectionIdentifier {
  return `related-collection-of-center-${centerUuid}-page-size-${pageSize}-page-${page}` as RelatedCollectionIdentifier;
}

export { RelatedCollectionIdentifier, createRelatedCollectionIdentifier };
