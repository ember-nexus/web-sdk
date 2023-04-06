import { v4 as uuidv4 } from 'uuid';

type DeleteElementEventDetails = {
  uuid: typeof uuidv4;
  element: Promise<void> | null;
};

export default DeleteElementEventDetails;
