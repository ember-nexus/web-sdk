import { Service } from 'typedi';

import { NetworkError } from '~/Error/NetworkError';
import { ParseError } from '~/Error/ParseError';
import { FetchHelper } from '~/Service/FetchHelper';
import { Logger } from '~/Service/Logger';
import { Data } from '~/Type/Definition/Data';
import { UniqueUserIdentifier } from '~/Type/Definition/UniqueUserIdentifier';
import { Uuid, validateUuidFromString } from '~/Type/Definition/Uuid';

/**
 * The post token endpoint is used to create new tokens.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/user?id=posttokenendpoint)
 * @see [Ember Nexus API: Create Token Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/user/post-token)
 *
 * @internal
 */
@Service()
class PostTokenEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
  ) {}

  async postToken(uniqueUserIdentifier: UniqueUserIdentifier, password: string, data: Data = {}): Promise<Uuid> {
    return Promise.resolve()
      .then(() => {
        const url = this.fetchHelper.buildUrl(`/token`);
        this.logger.debug(`Executing HTTP POST request against url ${url} .`);
        return fetch(
          url,
          this.fetchHelper.getDefaultPostOptions(
            JSON.stringify({
              type: 'Token',
              uniqueUserIdentifier: uniqueUserIdentifier,
              password: password,
              data: data,
            }),
          ),
        );
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

export { PostTokenEndpoint };
