enum EventIdentifier {
  // user
  PostRegister = 'ember-nexus-sdk-post-register',
  PostChangePassword = 'ember-nexus-sdk-post-change-password',
  GetMe = 'ember-nexus-sdk-get-me',
  PostToken = 'ember-nexus-sdk-post-token',
  GetToken = 'ember-nexus-sdk-get-token',
  DeleteToken = 'ember-nexus-sdk-delete-token',

  // element
  GetIndex = 'ember-nexus-sdk-get-index',
  GetElement = 'ember-nexus-sdk-get-element',
  GetElementParents = 'ember-nexus-sdk-get-element-parents',
  GetElementChildren = 'ember-nexus-sdk-get-element-children',
  GetElementRelated = 'ember-nexus-sdk-get-element-related',
  PostIndex = 'ember-nexus-sdk-post-index',
  PostElement = 'ember-nexus-sdk-post-element',
  PutElement = 'ember-nexus-sdk-put-element',
  PatchElement = 'ember-nexus-sdk-patch-element',
  DeleteElement = 'ember-nexus-sdk-delete-element',

  // file
  GetElementFile = 'ember-nexus-sdk-get-element-file',
  PostElementFile = 'ember-nexus-sdk-post-element-file',
  PutElementFile = 'ember-nexus-sdk-put-element-file',
  PatchElementFile = 'ember-nexus-sdk-patch-element-file',
  DeleteElementFile = 'ember-nexus-sdk-delete-element-file',

  // webDAV
  CopyElement = 'ember-nexus-sdk-copy-element',
  LockElement = 'ember-nexus-sdk-lock-element',
  UnlockElement = 'ember-nexus-sdk-unlock-element',
  MkcolElement = 'ember-nexus-sdk-mkcol-element',
  MoveElement = 'ember-nexus-sdk-move-element',
  PropfindElement = 'ember-nexus-sdk-propfind-element',
  ProppatchElement = 'ember-nexus-sdk-proppatch-element',

  // search
  PostSearch = 'ember-nexus-sdk-post-search',

  // system
  GetInstanceConfiguration = 'ember-nexus-sdk-get-instance-configuration',
}

export { EventIdentifier };
