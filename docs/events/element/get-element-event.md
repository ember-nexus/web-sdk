# <span class="type-read">READ</span>` GetElementEvent -` Get Element Event

The get element event provides a standardized abstraction to retrieve nodes and relations from an Ember Nexus API
instance without interacting with it directly.

!> The event is based upon the get element endpoint within Ember Nexus API - <span class="method-get">GET</span> `/<uuid>`.  
   See the [APIs documentation](https://ember-nexus.github.io/api/#/api-endpoints/element/get-element) for more details.

All required parameters for the API call must be provided while creating the event object. Optional parameters may also
be included.

## Class Documentation

For up-to-date documentation see:

- [TypeDoc](.//type/classes/Event_Element_GetElementEvent.GetElementEvent.html)
- [Source code on GitHub](https://github.com/ember-nexus/web-sdk/blob/main/src/Event/Element/GetElementEvent.ts)

## Example

<!-- tabs:start -->

### **JS**

```js
// init
const webSdkRoot = document.getElementById("web-sdk-root");
new Api(webSdkRoot);
const eventSource = document.getElementById("event-source");

// create event itself
const getElementEvent = new GetElementEvent("7f57c1ea-2fa3-4a0b-a1a5-5446669cd662");

// dispatch event
eventSource.dispatchEvent(getElementEvent);

// output returned element
console.log(getElementEvent.getElement());
```

### **HTML**

```html
<html>
<body>
<div id="web-sdk-root">
  <div id="event-source"></div>
</div>
</body>
</html>
```

### **Console**

```txt
> hello world lol
```

<!-- tabs:end -->

