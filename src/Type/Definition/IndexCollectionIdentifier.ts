import { Branded } from '~/Type/Definition/Branded';

/**
 * Branded type primarily used for keys.
 */
type IndexCollectionIdentifier = Branded<string, 'COLLECTION_IDENTIFIER'>;

function createIndexCollectionIdentifier(page: number, pageSize: number): IndexCollectionIdentifier {
  return `index-collection-page-size-${pageSize}-page-${page}` as IndexCollectionIdentifier;
}

export { IndexCollectionIdentifier, createIndexCollectionIdentifier };
