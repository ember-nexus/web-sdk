import 'reflect-metadata';


import { Container, Service } from 'typedi';
import {GetElementEvent} from "~/Event/Element/GetElementEvent";
import { v4 as uuidv4 } from 'uuid';
import GetElementEndpoint from "~/Endpoint/Element/GetElementEndpoint";

@Service()
class ExampleInjectedService {

  event: GetElementEvent;

  printMessage() {
    console.log('I am alive!');
    console.log("Really :D");
    console.log("Hi");
    this.event = new GetElementEvent(uuidv4());
    console.log(this.event);
    console.log("End of print ^^");
    console.log("edited 2");
  }
}

@Service()
class ExampleService {
  constructor(
    // because we annotated ExampleInjectedService with the @Service()
    // decorator TypeDI will automatically inject an instance of
    // ExampleInjectedService here when the ExampleService class is requested
    // from TypeDI.
    public injectedService: ExampleInjectedService
  ) {}
}

const serviceInstance = Container.get(ExampleService);
// we request an instance of ExampleService from TypeDI

serviceInstance.injectedService.printMessage();

const getElementEndpoint = Container.get(GetElementEndpoint);
console.log(getElementEndpoint);
