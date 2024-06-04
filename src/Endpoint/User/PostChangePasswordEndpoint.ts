import { Service } from 'typedi';

import { NetworkError, ParseError } from '../../Error/index.js';
import { FetchHelper, Logger } from '../../Service/index.js';
import { UniqueUserIdentifier } from '../../Type/Definition/index.js';

/**
 * The post change password endpoint is used to change the user's password.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/user?id=postchangepasswordendpoint)
 * @see [Ember Nexus API: Change Password Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/user/post-change-password)
 *
 * @internal
 */
@Service()
class PostChangePasswordEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
  ) {}

  async postChangePassword(
    uniqueUserIdentifier: UniqueUserIdentifier,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    return Promise.resolve()
      .then(() => {
        const url = this.fetchHelper.buildUrl(`/change-password`);
        this.logger.debug(`Executing HTTP POST request against url ${url} .`);
        return fetch(
          url,
          this.fetchHelper.getDefaultPostOptions(
            JSON.stringify({
              type: 'ActionChangePassword',
              currentPassword: currentPassword,
              newPassword: newPassword,
              uniqueUserIdentifier: uniqueUserIdentifier,
            }),
          ),
        );
      })
      .catch((error) => {
        return Promise.reject(new NetworkError(`Experienced generic network error during creating resource.`, error));
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

export { PostChangePasswordEndpoint };
