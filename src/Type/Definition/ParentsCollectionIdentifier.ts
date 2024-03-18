import { Branded } from '~/Type/Definition/Branded';
import { Uuid } from '~/Type/Definition/Uuid';

type ParentsCollectionIdentifier = Branded<string, 'COLLECTION_IDENTIFIER'>;

function createParentsCollectionIdentifier(
  childUuid: Uuid,
  page: number,
  pageSize: number,
): ParentsCollectionIdentifier {
  return `parents-collection-of-child-${childUuid}-page-size-${pageSize}-page-${page}` as ParentsCollectionIdentifier;
}

export { ParentsCollectionIdentifier, createParentsCollectionIdentifier };
