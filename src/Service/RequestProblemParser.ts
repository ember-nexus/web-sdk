import { Service } from 'typedi';

import { RequestProblem } from '../Type/Definition/index.js';
import { RequestProblemCategory } from '../Type/Enum/index.js';

/**
 * Class which helps to parse problem responses.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class RequestProblemParser {
  rawRequestProblemToRequestProblem(problem: object): RequestProblem {
    const category = RequestProblemCategory.ServerSide;
    if (!('title' in problem)) {
      throw new Error("Raw Problem must contain property 'title' in order to be correctly parsed.");
    }
    const title = String(problem.title);
    if (!('detail' in problem)) {
      throw new Error("Raw Problem must contain property 'detail' in order to be correctly parsed.");
    }
    const detail = String(problem.detail);
    const parsedProblem = {
      category: category,
      title: title,
      detail: detail,
    } as RequestProblem;
    if ('type' in problem) {
      parsedProblem.type = String(problem.type);
    }
    if ('status' in problem) {
      parsedProblem.status = Number(problem.status);
    }
    if ('exception' in problem) {
      if (typeof problem.exception !== 'object' || problem.exception === null) {
        throw new Error("Property 'exception' of raw problem must be a record of type string, any.");
      }
      parsedProblem.exception = problem.exception as Record<string, unknown>;
    }
    return parsedProblem;
  }
}

export { RequestProblemParser };
