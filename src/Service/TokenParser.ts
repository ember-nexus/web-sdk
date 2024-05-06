import { Service } from 'typedi';

import { Token } from '~/Type/Definition/Token';
import { validateTokenFromString } from '~/Type/Definition/Token';

/**
 * Class which helps to parse tokens.
 *
 * **⚠️ Warning**: This is an internal class. You should not use it directly.
 *
 * @internal
 */
@Service()
class TokenParser {
  rawTokenToToken(token: object): Token {
    if (!('type' in token)) {
      throw new Error("Raw token must contain property 'type' in order to be parsed to a token.");
    }
    const type = String(token.type);
    if (type !== '_TokenResponse') {
      throw new Error("Type must be '_TokenResponse' in order to be parsed to a token.");
    }

    if (!('token' in token)) {
      throw new Error("Raw token must contain property 'token' in order to be parsed to a token.");
    }
    return validateTokenFromString(String(token.token));
  }
}

export { TokenParser };
