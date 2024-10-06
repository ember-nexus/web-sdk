import { Service } from 'typedi';

import { EmberNexusError, NetworkError, ParseError, ValidationError } from '../../Error/index.js';
import { CollectionParser, FetchHelper, Logger } from '../../Service/index.js';
import { Collection, Uuid } from '../../Type/Definition/index.js';

/**
 * The get element related endpoint retrieves all related nodes of a single center node.
 *
 * The related nodes are paginated. Within each page, all relations between the center node and the related nodes
 * contained on the page are returned.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @see [Further documentation](https://ember-nexus.github.io/web-sdk/#/endpoints/element?id=getelementrelatedendpoint)
 * @see [Ember Nexus API: Get Element Related Endpoint](https://ember-nexus.github.io/api/#/api-endpoints/element/get-related)
 *
 * @internal
 */
@Service()
class GetElementRelatedEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
    private collectionParser: CollectionParser,
  ) {}

  getElementRelated(centerId: Uuid, page: number = 1, pageSize: number = 25): Promise<Collection> {
    return Promise.resolve()
      .then(() => {
        if (page < 1) {
          return Promise.reject(new ValidationError('Page number must be at least 1.'));
        }
        if (pageSize < 1) {
          return Promise.reject(new ValidationError('Page size must be at least 1.'));
        }
        const url = this.fetchHelper.buildUrl(`/${centerId}/related?page=${page}&pageSize=${pageSize}`);
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
        if (contentType === null) {
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

export { GetElementRelatedEndpoint };
