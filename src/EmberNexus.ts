import 'reflect-metadata';

import { Container } from 'typedi';

import GetElementEndpoint from '~/Endpoint/Element/GetElementEndpoint';
import { WebSdkConfiguration } from '~/Service/WebSdkConfiguration';
import { Relation } from '~/Type/Definition/Relation';
import { Uuid } from '~/Type/Definition/Uuid';

class EmberNexus {
  test(uuid: Uuid): Promise<Node | Relation> {
    return Container.get(GetElementEndpoint).getElement(uuid);
  }
}

export { EmberNexus, Container, WebSdkConfiguration };
