import { Service } from 'typedi';

import { FetchHelper } from '~/Service/FetchHelper';
import { Logger } from '~/Service/Logger';
import { RequestProblemParser } from '~/Service/RequestProblemParser';
import { NodeWithOptionalId } from '~/Type/Definition/NodeWithOptionalId';
import { RelationWithOptionalId } from '~/Type/Definition/RelationWithOptionalId';
import { RequestProblem } from '~/Type/Definition/RequestProblem';
import { RequestProblemCategory } from '~/Type/Enum/RequestProblemCategory';

@Service()
class PostIndexEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
    private requestProblemParser: RequestProblemParser,
  ) {}

  async postIndex(element: NodeWithOptionalId | RelationWithOptionalId): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.fetchHelper
        .runWrappedFetch(`/`, this.fetchHelper.getDefaultPostOptions(JSON.stringify(element)))
        .then(async (response) => {
          if (response.ok) {
            const location = response.headers.get('Location');
            if (location === null) {
              const requestProblem = {
                category: RequestProblemCategory.Logic,
                title: `Encountered logic problem`,
                detail: `Unable to find Location-header in response of POST-request.`,
              } as RequestProblem;
              this.logger.error(requestProblem);
              reject(requestProblem);
            }
            resolve(response.headers.get('Location') ?? '');
            return;
          }
          const data = await response.json();
          const requestProblem = this.requestProblemParser.rawRequestProblemToRequestProblem(data);
          this.logger.error(requestProblem);
          reject(requestProblem);
          return;
        })
        .catch((error) => {
          const requestProblem = {
            category: RequestProblemCategory.ClientSide,
            title: `Encountered network problem`,
            detail: `See exception for details.`,
            exception: error,
          } as RequestProblem;
          this.logger.error(requestProblem);
          reject(requestProblem);
        });
    });
  }
}

export default PostIndexEndpoint;
