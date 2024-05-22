import { Service } from 'typedi';

import { NetworkError } from '../../Error';
import { ParseError } from '../../Error';
import { FetchHelper } from '../../Service';
import { Logger } from '../../Service';
import { Uuid } from '../../Type/Definition';

/**
 * The delete element endpoint deletes a single element.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/element?id=deleteelementendpoint)
 * @see [Ember Nexus API: Delete Element Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/delete-element)
 *
 * @internal
 */
@Service()
class DeleteElementEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
  ) {}

  async deleteElement(elementId: Uuid): Promise<void> {
    const url = this.fetchHelper.buildUrl(`/${elementId}`);
    this.logger.debug(`Executing HTTP DELETE request against url ${url} .`);
    return fetch(url, this.fetchHelper.getDefaultDeleteOptions())
      .catch((networkError) => {
        return Promise.reject(
          new NetworkError(`Experienced generic network error during deleting resource.`, networkError),
        );
      })
      .then(async (response: Response) => {
        if (response.ok && response.status == 204) {
          return Promise.resolve();
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

export { DeleteElementEndpoint };
