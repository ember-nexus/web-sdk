import { v4 as uuidv4 } from 'uuid';
type TimeToLifeReference = {
  uuid: typeof uuidv4;
  timestamp: number;
};

export default TimeToLifeReference;
