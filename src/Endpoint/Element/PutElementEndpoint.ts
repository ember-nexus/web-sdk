import { Service } from 'typedi';

import { NetworkError, ParseError } from '../../Error/index.js';
import { FetchHelper, Logger } from '../../Service/index.js';
import { Data, Uuid } from '../../Type/Definition/index.js';

/**
 * The put element endpoint replaces a single element.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/element?id=putelementendpoint)
 * @see [Ember Nexus API: Replace Element Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/put-element)
 *
 * @internal
 */
@Service()
class PutElementEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
  ) {}

  putElement(elementId: Uuid, data: Data): Promise<void> {
    return Promise.resolve()
      .then(() => {
        this.logger.warn(
          'The endpoint put element will be changed in the next major version, expect changed interfaces.',
        );
        const url = this.fetchHelper.buildUrl(`/${elementId}`);
        this.logger.debug(`Executing HTTP PUT request against url ${url} .`);
        return fetch(url, this.fetchHelper.getDefaultPutOptions(JSON.stringify(data)));
      })
      .catch((error) => {
        throw new NetworkError(`Experienced generic network error during updating resource.`, error);
      })
      .then(async (response: Response) => {
        if (response.ok && response.status === 204) {
          return;
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType === null) {
          throw new ParseError('Response does not contain content type header.');
        }
        if (!contentType.includes('application/problem+json')) {
          throw new ParseError("Unable to parse response as content type is not 'application/problem+json'.");
        }
        const data = await response.json();
        throw this.fetchHelper.createResponseErrorFromBadResponse(response, data);
      })
      .catch((error) => {
        this.logger.error(error.message, error);
        throw error;
      });
  }
}

export { PutElementEndpoint };
