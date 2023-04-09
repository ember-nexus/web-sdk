import { SinonSandbox, assert, createSandbox } from 'sinon';

import ElementUuid from '../msw-mock/handlers/index.js';
import server from '../msw-mock/server.js';
import DeleteElementEndpoint from "../../../src/endpoint/delete-element.js";
import LoggerInterface from "../../../src/type/logger-interface.js";
import {mock} from "ts-mockito";
import OptionsInterface from "../../../src/type/options-interface.js";
import sinon from 'sinon';
import testLogger from "../../test-logger.js";
import Options from "../../../src/options.js";

describe('deleteElement tests', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    server.listen();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    server.resetHandlers();
  });

  it.only('should delete an existing element from the api', async () => {

    // let loggerMock:LoggerInterface = mock<LoggerInterface>();
    //
    // console.log(loggerMock);

    // let loggerSpy = sinon.spy(loggerMock);
    const debugLogger = sandbox.stub(testLogger, 'debug');

    const options = new Options();

    const deleteElementEndpoint = new DeleteElementEndpoint(
      testLogger,
      options
    );

    await deleteElementEndpoint.deleteElement(ElementUuid.DeletableElement);

    assert.calledOnceWithExactly(debugLogger, 'Deleted element with identifier 41f4557f-0d3e-416f-a5d1-09d02433432d.');
  });

});
