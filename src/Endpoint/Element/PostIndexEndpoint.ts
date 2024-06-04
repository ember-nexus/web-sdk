import { Service } from 'typedi';

import { NetworkError, ParseError } from '../../Error/index.js';
import { FetchHelper, Logger } from '../../Service/index.js';
import {
  NodeWithOptionalId,
  RelationWithOptionalId,
  Uuid,
  validateUuidFromString,
} from '../../Type/Definition/index.js';

/**
 * The post index endpoint creates a single element.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/element?id=postindexendpoint)
 * @see [Ember Nexus API: Create Root Level Element Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/post-index)
 *
 * @internal
 */
@Service()
class PostIndexEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
  ) {}

  async postIndex(element: NodeWithOptionalId | RelationWithOptionalId): Promise<Uuid> {
    return Promise.resolve()
      .then(() => {
        const url = this.fetchHelper.buildUrl(`/`);
        this.logger.debug(`Executing HTTP POST request against url ${url} .`);
        return fetch(url, this.fetchHelper.getDefaultPostOptions(JSON.stringify(element)));
      })
      .catch((error) => {
        return Promise.reject(new NetworkError(`Experienced generic network error during creating resource.`, error));
      })
      .then(async (response: Response) => {
        if (response.ok && response.status == 204) {
          if (response.headers.has('Location')) {
            const location = response.headers.get('Location') as string;
            const rawUuid = location.split('/').at(-1) as string;
            return Promise.resolve(validateUuidFromString(rawUuid));
          }
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType == null) {
          return Promise.reject(new ParseError('Response does not contain content type header.'));
        }
        if (!contentType.includes('application/problem+json')) {
          return Promise.reject(
            new ParseError("Unable to parse response as content type is not 'application/problem+json'."),
          );
        }
        const data = await response.json();
        return Promise.reject(this.fetchHelper.createResponseErrorFromBadResponse(response, data));
      })
      .catch((error) => {
        this.logger.error(error.message, error);
        return Promise.reject(error);
      });
  }
}

export { PostIndexEndpoint };
