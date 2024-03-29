# <span class="title-url"><span class="method-get">GetIndexEvent</span>

<!-- panels:start -->
<!-- div:left-panel -->

> [!NOTE]
> The <span class="method-get">GetIndexEvent</span> internally calls the
> <span class="method-get">GetIndexEndpoint</span>, which in turn executes a fetch request against the
> <a href="https://ember-nexus.github.io/api/#/api-endpoints/element/get-index">Ember Nexus API's get index endpoint</a>.
> See their respective documentation for details on failure cases etc.

## Example

<!-- tabs:start -->

### **JavaScript**

```js
const event = new GetIndexEvent();

document.getElementById('eventSource').dispatchEvent(event);

console.log(event.getElement());
```

### **TypeScript**

```js
todo
```

### **HTML**

```html
<body>
  <div id="eventSource"></div>
</body>
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->

<!-- div:right-panel -->

<div id="graph-container-1" class="graph-container" style="height:700px"></div>

<!-- panels:end -->

<script>
renderWorkflow(document.getElementById('graph-container-1'), {
  nodes: [
    { id: 'eventIsFired', ...workflowStart, label: 'GetIndexEvent\nis fired' },
    { id: 'webSdkInterceptsEvent', ...workflowStep, label: "Web SDK intercepts event" },
    { id: 'endpointIsExecuted', ...workflowStep, label: "GetIndexEndpoint\nis executed" },
    { id: 'endpointResultIsSavedInEvent', ...workflowStep, label: "endpoint result\nis saved to event" },
    { id: 'eventIsStopped', ...workflowEndSuccess , label: "event is stopped"},
  ],
  edges: [
    { source: 'eventIsFired', target: 'webSdkInterceptsEvent', label: '' },
    { source: 'webSdkInterceptsEvent', target: 'endpointIsExecuted', label: '' },
    { source: 'endpointIsExecuted', target: 'endpointResultIsSavedInEvent', label: '' },
    { source: 'endpointResultIsSavedInEvent', target: 'eventIsStopped', label: '' },
  ],
}, 'TB');
</script>
