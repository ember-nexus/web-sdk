import { Service } from 'typedi';

import { EmberNexusError, NetworkError, ParseError, ValidationError } from '../../Error/index.js';
import { CollectionParser, FetchHelper, Logger } from '../../Service/index.js';
import { Collection, Uuid } from '../../Type/Definition/index.js';

/**
 * The get element children endpoint retrieves all child nodes of a single parent node.
 *
 * The child nodes are paginated. Within each page, all relations between the parent node and the child nodes contained
 * on the page are returned.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class GetElementChildrenEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
    private collectionParser: CollectionParser,
  ) {}

  getElementChildren(parentId: Uuid, page: number = 1, pageSize: number = 25): Promise<Collection> {
    return Promise.resolve()
      .then(() => {
        if (page < 1) {
          throw new ValidationError('Page number must be at least 1.');
        }
        if (pageSize < 1) {
          throw new ValidationError('Page size must be at least 1.');
        }
        const url = this.fetchHelper.buildUrl(`/${parentId}/children?page=${page}&pageSize=${pageSize}`);
        this.logger.debug(`Executing HTTP GET request against url ${url} .`);
        return fetch(url, this.fetchHelper.getDefaultGetOptions());
      })
      .catch((error) => {
        if (error instanceof EmberNexusError) {
          throw error;
        }
        throw new NetworkError(`Experienced generic network error during fetching resource.`, error);
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
      .then<Collection>((jsonResponse) => {
        return this.collectionParser.rawCollectionToCollection(jsonResponse);
      })
      .catch((error) => {
        this.logger.error(error.message, error);
        throw error;
      });
  }
}

export { GetElementChildrenEndpoint };
