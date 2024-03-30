import {EmberNexus, Container, WebSdkConfiguration} from "../../../../dist/bundle.js";

// Setup.
const configuration = Container.get(WebSdkConfiguration);
configuration.setApiHost("http://ember-nexus-frontend-api:80");
// configuration.setApiHost("http://localhost:8004");
configuration.setToken("secret-token:MmFndbNiEHUr87EtAl8mH4");

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
