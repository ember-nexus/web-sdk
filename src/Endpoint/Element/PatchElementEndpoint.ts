import { Service } from 'typedi';

import { NetworkError } from '~/Error/NetworkError';
import { ParseError } from '~/Error/ParseError';
import { FetchHelper } from '~/Service/FetchHelper';
import { Logger } from '~/Service/Logger';
import { Data } from '~/Type/Definition/Data';
import { Uuid } from '~/Type/Definition/Uuid';

@Service()
class PatchElementEndpoint {
  constructor(
    private logger: Logger,
    private fetchHelper: FetchHelper,
  ) {}

  async patchElement(uuid: Uuid, data: Data): Promise<void> {
    return Promise.resolve()
      .then(() => {
        this.logger.warn(
          'The endpoint patch element will be changed in the next major version, expect changed interfaces.',
        );
        const url = this.fetchHelper.buildUrl(`/${uuid}`);
        this.logger.debug(`Executing HTTP PATCH request against url ${url} .`);
        return fetch(url, this.fetchHelper.getDefaultPatchOptions(JSON.stringify(data)));
      })
      .catch((error) => {
        return Promise.reject(new NetworkError(`Experienced generic network error during patching resource.`, error));
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

export { PatchElementEndpoint };
