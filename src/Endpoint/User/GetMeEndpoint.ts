import { Service } from 'typedi';

import { LogicError, NetworkError, ParseError } from '../../Error/index.js';
import { ElementParser, FetchHelper, Logger } from '../../Service/index.js';
import { Node } from '../../Type/Definition/index.js';

/**
 * The get me endpoint retrieves the current user's element.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/user?id=getmeendpoint)
 * @see [Ember Nexus API: Get Me Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/user/get-me)
 *
 * @internal
 */
@Service()
class GetMeEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
    private elementParser: ElementParser,
  ) {}

  getMe(): Promise<Node> {
    const url = this.fetchHelper.buildUrl(`/me`);
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
      .then<Node>((jsonResponse) => {
        const element = this.elementParser.rawElementToNodeOrRelation(jsonResponse);
        if (element.type !== 'User') {
          throw new LogicError("Expected node to be of type 'User'.");
        }
        return element;
      })
      .catch((error) => {
        this.logger.error(error.message, error);
        throw error;
      });
  }
}

export { GetMeEndpoint };
