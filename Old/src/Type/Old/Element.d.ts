import { v4 as uuidv4 } from 'uuid';

type Element = {
  type: string;
  id: typeof uuidv4;
  data: object;
};

export default Element;
