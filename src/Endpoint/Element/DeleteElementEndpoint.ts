import { Service } from 'typedi';

import { NetworkError } from '~/Error/NetworkError';
import { ParseError } from '~/Error/ParseError';
import { FetchHelper } from '~/Service/FetchHelper';
import { Logger } from '~/Service/Logger';
import { Uuid } from '~/Type/Definition/Uuid';

@Service()
/**
 * @internal
 */
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
