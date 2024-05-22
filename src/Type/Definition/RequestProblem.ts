import { RequestProblemCategory } from '../Enum';

type RequestProblem = {
  category: RequestProblemCategory;
  type?: string;
  title: string;
  status?: number;
  detail: string;
  exception?: Record<string, unknown>;
};

export { RequestProblem };
