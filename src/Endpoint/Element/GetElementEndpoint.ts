import { Service } from 'typedi';

import { NetworkError, ParseError } from '../../Error/index.js';
import { ElementParser, FetchHelper, Logger } from '../../Service/index.js';
import { Node, Relation, Uuid } from '../../Type/Definition/index.js';

/**
 * The get element endpoint retrieves a single element.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/element?id=getelementendpoint)
 * @see [Ember Nexus API: Get Element Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/get-element)
 *
 * @internal
 */
@Service()
class GetElementEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
    private elementParser: ElementParser,
  ) {}

  getElement(elementId: Uuid): Promise<Node | Relation> {
    const url = this.fetchHelper.buildUrl(`/${elementId}`);
    this.logger.debug(`Executing HTTP GET request against url ${url} .`);
    return fetch(url, this.fetchHelper.getDefaultGetOptions())
      .catch((networkError) => {
        throw new NetworkError(`Experienced generic network error during fetching resource.`, networkError);
      })
      .then(async (response: Response) => {
        const contentType = response.headers.get('Content-Type');
        if (contentType === null) {
          throw new ParseError('Response does not contain content type header.');
        }
        if (!(contentType.includes('application/json') || contentType.includes('application/problem+json'))) {
          throw new ParseError(
            "Unable to parse response as content type is neither 'application/json' nor 'application/problem+json'.",
          );
        }
        const data = await response.json();
        if (!response.ok) {
          throw this.fetchHelper.createResponseErrorFromBadResponse(response, data);
        }
        return data;
      })
      .then<Node | Relation>((jsonResponse) => {
        return this.elementParser.rawElementToNodeOrRelation(jsonResponse);
      })
      .catch((error) => {
        this.logger.error(error.message, error);
        throw error;
      });
  }
}

export { GetElementEndpoint };
