import { Relation } from '~/Type/Definition/Relation';

type RelationWithOptionalId = Omit<Relation, 'id'> & Pick<Partial<Relation>, 'id'>;

export { RelationWithOptionalId };
