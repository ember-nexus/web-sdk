import { Service } from 'typedi';

import { NetworkError } from '~/Error/NetworkError';
import { ParseError } from '~/Error/ParseError';
import { FetchHelper } from '~/Service/FetchHelper';
import { Logger } from '~/Service/Logger';
import { TokenParser } from '~/Service/TokenParser';
import { Data } from '~/Type/Definition/Data';
import { Token } from '~/Type/Definition/Token';
import { UniqueUserIdentifier } from '~/Type/Definition/UniqueUserIdentifier';

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
    private tokenParser: TokenParser,
    private fetchHelper: FetchHelper,
  ) {}

  async postToken(uniqueUserIdentifier: UniqueUserIdentifier, password: string, data: Data = {}): Promise<Token> {
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
      .then<Token>((jsonResponse) => {
        return this.tokenParser.rawTokenToToken(jsonResponse);
      })
      .catch((error) => {
        this.logger.error(error.message, error);
        return Promise.reject(error);
      });
  }
}

export { PostTokenEndpoint };
