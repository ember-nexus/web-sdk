import 'reflect-metadata';

import { Container, Service } from 'typedi';
// import { parse as uuidParse } from 'uuid';

import { Logger } from '~/Service/Logger';
// import GetElementEndpoint from "~/Endpoint/Element/GetElementEndpoint";
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';

import {GetElementEvent} from "~/Event/Element/GetElementEvent";

@Service()
class TestService {
  constructor(public logger: Logger) {}

  test(): void {
    this.logger.debug('level is debug');
    this.logger.info('level is info');
    this.logger.warn('level is warn');
    this.logger.error('level is error');
    console.log(new GetElementEvent('b63a3196-7373-4d44-b590-f94e31021bf3'));
  }
}

export { TestService, GetElementEvent };

const service = Container.get(TestService);
service.test();

const webSdkConfiguration = Container.get(WebSdkConfiguration);
webSdkConfiguration.setApiHost('http://localhost');

// const getElementEndpoint = Container.get(GetElementEndpoint);
// const res = await getElementEndpoint.getElement(uuidParse('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'));
// console.log(res);
