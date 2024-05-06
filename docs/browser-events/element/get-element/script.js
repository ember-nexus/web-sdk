import {EmberNexus, Container, WebSdkConfiguration, Logger} from "../../../../dist/ember-nexus-web-sdk.js";

// Setup.
const configuration = Container.get(WebSdkConfiguration);
configuration.setApiHost("http://ember-nexus-frontend-api:80");
// configuration.setApiHost("http://localhost:8004");
configuration.setToken("secret-token:MmFndbNiEHUr87EtAl8mH4");


const logger = Container.get(Logger);
logger.debug("Debug message");
logger.info("Info message");
logger.warn("Warn message");
logger.error("Error message");
console.log("log");
console.info("info");
console.warn("warn");
console.error("error");


/// [example]
const emberNexus = new EmberNexus();
const elementUuid = "59493df1-736f-4860-b4a8-a7ebb2bcd96e";
const element = await emberNexus.getElement(elementUuid);
console.log(element);
/// [example]

// The following code is required for automatic execution.
const node = document.createElement("div");
node.setAttribute('id', 'finished');
document.body.appendChild(node);
