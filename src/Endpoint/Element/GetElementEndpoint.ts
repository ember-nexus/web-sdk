import { Service } from 'typedi';

import { NetworkError } from '~/Error/NetworkError';
import { ParseError } from '~/Error/ParseError';
import { ElementParser } from '~/Service/ElementParser';
import { FetchHelper } from '~/Service/FetchHelper';
import { Logger } from '~/Service/Logger';
import { Node } from '~/Type/Definition/Node';
import { Relation } from '~/Type/Definition/Relation';
import { Uuid } from '~/Type/Definition/Uuid';

@Service()
class GetElementEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
    private elementParser: ElementParser,
  ) {}

  async getElement(uuid: Uuid): Promise<Node | Relation> {
    const url = this.fetchHelper.buildUrl(`/${uuid}`);
    this.logger.debug(`Executing HTTP GET request against url ${url} .`);
    return fetch(url, this.fetchHelper.getDefaultGetOptions())
      .catch((networkError) => {
        return Promise.reject(
          new NetworkError(`Experienced generic network error during fetching resource.`, networkError),
        );
      })
      .then(async (response: Response) => {
        const contentType = response.headers.get('Content-Type');
        if (contentType == null) {
          return Promise.reject(new ParseError('Response does not contain content type header.'));
        }
        if (!(contentType.includes('application/json') || contentType.includes('application/problem+json'))) {
          return Promise.reject(
            new ParseError(
              "Unable to parse response as content type is neither 'application/json' nor 'application/problem+json'.",
            ),
          );
        }
        const data = await response.json();
        if (!response.ok) {
          return Promise.reject(this.fetchHelper.createResponseErrorFromBadResponse(response, data));
        }
        return data;
      })
      .then<Node | Relation>((jsonResponse) => {
        return this.elementParser.rawElementToNodeOrRelation(jsonResponse);
      })
      .catch((error) => {
        this.logger.error(error.message, error);
        return Promise.reject(error);
      });
  }
}

export default GetElementEndpoint;
