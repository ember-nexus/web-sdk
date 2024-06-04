import { Relation } from './Relation.js';

/**
 * Relation with optional id.
 */
type RelationWithOptionalId = Omit<Relation, 'id'> & Pick<Partial<Relation>, 'id'>;

export { RelationWithOptionalId };
