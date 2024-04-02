# Element Endpoints

**Endpoints are internal classes**, which provide a direct mapping to some specific Ember Nexus API endpoint.  
They furthermore take JavaScript objects as their inputs, and are sending JSON to the remote API instance.

Element endpoints in particular are mapping Ember Nexus API element endpoints.

## <span class="method-get">GetIndexEndpoint</span>

The get index endpoint is used to retrieve all root level nodes.

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_GetIndexEndpoint.GetIndexEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/get-index)

<!-- tabs:start -->

### **JavaScript**

```js
const getIndexEndpoint = new GetIndexEndpoint();
const indexCollection = getIndexEndpoint.getIndex();
console.log(indexCollection);
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-get">GetElementEndpoint</span>

The get element endpoint is used to retrieve data of a specific element, either a node or relation.

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_GetElementEndpoint.GetElementEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/get-element)

<!-- tabs:start -->

### **JavaScript**

```js
const getElementEndpoint = new GetElementEndpoint();
const element = getElementEndpoint.getElement("b8480f77-9d07-48fd-8d9b-ed13db97e9c7");
console.log(element);
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-get">GetElementParentsEndpoint</span>

The get element parents endpoint is used to retrieve all parent nodes from a node.

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_GetElementParentsEndpoint.GetElementParentsEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/get-parents)

<!-- tabs:start -->

### **JavaScript**

```js
const getElementParentsEndpoint = new GetElementParentsEndpoint();
const elementParentsCollection = getElementParentsEndpoint.getElementParents();
console.log(elementParentsCollection);
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-get">GetElementChildrenEndpoint</span>

...

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_GetElementChildrenEndpoint.GetElementChildrenEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/get-children)

<!-- tabs:start -->

### **JavaScript**

```js
const getElementChildrenEndpoint = new GetElementChildrenEndpoint();
const elementChildrenCollection = getElementChildrenEndpoint.getElementChildren();
console.log(elementChildrenCollection);
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-get">GetElementRelatedEndpoint</span>

...

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_GetElementRelatedEndpoint.GetElementRelatedEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/get-related)

<!-- tabs:start -->

### **JavaScript**

```js
const getElementRelatedEndpoint = new GetElementRelatedEndpoint();
const elementRelatedCollection = getElementRelatedEndpoint.getElementRelated();
console.log(elementRelatedCollection);
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-post">PostIndexEndpoint</span>

...

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_PostIndexEndpoint.PostIndexEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/post-index)

<!-- tabs:start -->

### **JavaScript**

```js
const postIndexEndpoint = new PostIndexEndpoint();
postIndexEndpoint.postIndex();
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-post">PostElementEndpoint</span>

...

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_PostElementEndpoint.PostElementEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/post-element)

<!-- tabs:start -->

### **JavaScript**

```js
const postElementEndpoint = new PostElementEndpoint();
postElementEndpoint.postElement();
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-put">PutElementEndpoint</span>

...

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_PutElementEndpoint.PutElementEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/put-element)

<!-- tabs:start -->

### **JavaScript**

```js
const putElementEndpoint = new PutElementEndpoint();
putElementEndpoint.putElement();
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-patch">PatchElementEndpoint</span>

...

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_PatchElementEndpoint.PatchElementEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/patch-element)

<!-- tabs:start -->

### **JavaScript**

```js
const patchElementEndpoint = new PatchElementEndpoint();
patchElementEndpoint.patchElement();
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->


## <span class="method-delete">DeleteElementEndpoint</span>

...

Links:
- [TypeDoc](https://ember-nexus.github.io/web-sdk/type/classes/Endpoint_Element_DeleteElementEndpoint.DeleteElementEndpoint.html)
- [Ember Nexus API](https://ember-nexus.github.io/api/#/api-endpoints/element/delete-element)

<!-- tabs:start -->

### **JavaScript**

```js
const deleteElementEndpoint = new DeleteElementEndpoint();
deleteElementEndpoint.deleteElement();
```

### **Console**

```txt
bla bla bla
```

<!-- tabs:end -->
