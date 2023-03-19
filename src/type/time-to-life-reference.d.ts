import { v4 as uuidv4 } from 'uuid';

export type TimeToLifeReference = {
  uuid: typeof uuidv4;
  timestamp: number;
};
