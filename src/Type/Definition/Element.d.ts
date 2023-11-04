import type { v4 as uuidv4 } from 'uuid';

type Element = {
  type: string;
  id: uuidv4;
  data: object;
};

export {Element};
