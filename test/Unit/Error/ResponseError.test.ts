import { expect } from 'chai';

import { ResponseError } from '../../../src/Error';

describe('ResponseError tests', () => {
  test('that getters and setters work', () => {
    const responseError = new ResponseError();

    expect(responseError.getType()).to.be.null;
    expect(responseError.getTitle()).to.be.null;
    expect(responseError.getDetail()).to.be.null;
    expect(responseError.getStatus()).to.be.null;

    responseError.setType('type');
    responseError.setTitle('title');
    responseError.setDetail('detail');
    responseError.setStatus(404);

    expect(responseError.getType()).to.equal('type');
    expect(responseError.getTitle()).to.equal('title');
    expect(responseError.getDetail()).to.equal('detail');
    expect(responseError.getStatus()).to.equal(404);
  });
});
