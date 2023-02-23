import { v4 as uuidv4 } from 'uuid';

export type Element = {
  type: string;
  id: typeof uuidv4;
  data: any;
};
