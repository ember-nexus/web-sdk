enum EventIdentifier {

  // user
  PostRegister = 'ember-nexus-post-register',
  PostChangePassword = 'ember-nexus-post-change-password',
  GetMe = 'ember-nexus-get-me',
  PostToken = 'ember-nexus-post-token',
  GetToken = 'ember-nexus-get-token',
  DeleteToken = 'ember-nexus-delete-token',

  // element
  GetIndex = 'ember-nexus-get-index',
  GetElement = 'ember-nexus-get-element',
  GetElementParents = 'ember-nexus-get-element-parents',
  GetElementChildren = 'ember-nexus-get-element-children',
  GetElementRelated = 'ember-nexus-get-element-related',
  PostIndex = 'ember-nexus-post-index',
  PostElement = 'ember-nexus-post-element',
  PutElement = 'ember-nexus-put-element',
  PatchElement = 'ember-nexus-patch-element',

  // file
  GetElementFile = 'ember-nexus-get-element-file',
  PostElementFile = 'ember-nexus-post-element-file',
  PutElementFile = 'ember-nexus-put-element-file',
  PatchElementFile = 'ember-nexus-patch-element-file',
  DeleteElementFile = 'ember-nexus-delete-element-file',

  // webDAV
  CopyElement = 'ember-nexus-copy-element',
  LockElement = 'ember-nexus-lock-element',
  UnlockElement = 'ember-nexus-unlock-element',
  MkcolElement = 'ember-nexus-mkcol-element',
  MoveElement = 'ember-nexus-move-element',
  PropfindElement = 'ember-nexus-propfind-element',
  ProppatchElement = 'ember-nexus-proppatch-element',

  // search
  PostSearch = 'ember-nexus-post-search',

  // system
  GetInstanceConfiguration = 'ember-nexus-get-instance-configuration',
}

export {EventIdentifier};
