import { Relation } from '~/Type/Definition/Relation';

/**
 * Relation with optional id.
 */
type RelationWithOptionalId = Omit<Relation, 'id'> & Pick<Partial<Relation>, 'id'>;

export { RelationWithOptionalId };
