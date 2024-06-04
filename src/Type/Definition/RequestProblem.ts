import { RequestProblemCategory } from '../Enum/index.js';

type RequestProblem = {
  category: RequestProblemCategory;
  type?: string;
  title: string;
  status?: number;
  detail: string;
  exception?: Record<string, unknown>;
};

export { RequestProblem };
