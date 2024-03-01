import { Service } from 'typedi';

import { ElementParser } from '~/Service/ElementParser';
import { FetchHelper } from '~/Service/FetchHelper';
import { Logger } from '~/Service/Logger';
import { RequestProblemParser } from '~/Service/RequestProblemParser';
import { Node } from '~/Type/Definition/Node';
import { Relation } from '~/Type/Definition/Relation';
import { RequestProblem } from '~/Type/Definition/RequestProblem';
import { Uuid } from '~/Type/Definition/Uuid';
import { RequestProblemCategory } from '~/Type/Enum/RequestProblemCategory';

@Service()
class GetElementEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
    private elementParser: ElementParser,
    private requestProblemParser: RequestProblemParser,
  ) {}

  async getElement(uuid: Uuid): Promise<Node | Relation> {
    return this.fetchHelper
      .runWrappedFetch(`/${uuid}`, this.fetchHelper.getDefaultGetOptions())
      .then((response) => {
        if (!response.ok) return Promise.reject(new Error('Problem with request.'));
        return response.json();
      })
      .then<Node | Relation>((jsonResponse) => {
        return this.elementParser.rawElementToNodeOrRelation(jsonResponse);
      });
  }

  async getElementOld(uuid: Uuid): Promise<Node | Relation> {
    return new Promise<Node | Relation>((resolve, reject) => {
      this.fetchHelper
        .runWrappedFetch(`/${uuid}`, this.fetchHelper.getDefaultGetOptions())
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            const element = this.elementParser.rawElementToNodeOrRelation(data);
            resolve(element);
            return;
          }
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

export default GetElementEndpoint;
