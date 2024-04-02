import { Service } from 'typedi';

import { EmberNexusError } from '~/Error/EmberNexusError';
import { NetworkError } from '~/Error/NetworkError';
import { ParseError } from '~/Error/ParseError';
import { ValidationError } from '~/Error/ValidationError';
import { CollectionParser } from '~/Service/CollectionParser';
import { FetchHelper } from '~/Service/FetchHelper';
import { Logger } from '~/Service/Logger';
import { Collection } from '~/Type/Definition/Collection';

/**
 * The get index endpoint retrieves all root level nodes.
 *
 * The root-level nodes are paginated. No relations are returned, as relations always require a starting node and can
 * therefore never be root-level elements.
 *
 * **Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/element?id=getindexendpoint)
 * @see [Ember Nexus API: Get Index Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/get-index)
 *
 * @internal
 */
@Service()
class GetIndexEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
    private collectionParser: CollectionParser,
  ) {}

  async getIndex(page: number = 1, pageSize: number = 25): Promise<Collection> {
    return Promise.resolve()
      .then(() => {
        if (page < 1) {
          return Promise.reject(new ValidationError('Page number must be at least 1.'));
        }
        if (pageSize < 1) {
          return Promise.reject(new ValidationError('Page size must be at least 1.'));
        }
        const url = this.fetchHelper.buildUrl(`/?page=${page}&pageSize=${pageSize}`);
        this.logger.debug(`Executing HTTP GET request against url ${url} .`);
        return fetch(url, this.fetchHelper.getDefaultGetOptions());
      })
      .catch((error) => {
        if (error instanceof EmberNexusError) {
          return Promise.reject(error);
        }
        return Promise.reject(new NetworkError(`Experienced generic network error during fetching resource.`, error));
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
      .then<Collection>((jsonResponse) => {
        return this.collectionParser.rawCollectionToCollection(jsonResponse);
      })
      .catch((error) => {
        this.logger.error(error.message, error);
        return Promise.reject(error);
      });
  }
}

export { GetIndexEndpoint };
