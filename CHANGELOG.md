# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- Typedoc for SDK documentation.
- Rebuilt browser events for element and user endpoints.
- Rebuilt endpoint classes with better error handling and more solid parsing and validation code.
- Add support for Node.js v22.
- Implement `GetIndexEvent`, closes #56.
- Implement `GetElementEvent`, closes #55.
- Implement `GetParentsEvent`, closes #57.
- Implement `GetChildrenEvent`, closes #54.
- Implement `GetRelatedEvent`, closes #58.
- Implement `PostIndexEvent`, closes #61.
- Implement `PostElementEvent`, closes #60.
- Implement `PutElementEvent`, closes #62.
- Implement `PatchElementEvent`, closes #59.
- Implement `DeleteElementEvent`, closes #53.
### Changed
- Refactor code, tests and documentation.
- Replace Mocha with Jest to support code coverage.
- Update release action.

## 0.0.38 - 2023-07-20
### Added
- Register search event.

## 0.0.37 - 2023-07-18
### Added
- Add search event and endpoint.

## 0.0.36 - 2023-07-04
### Fixed
- Fixed event names.

## 0.0.35 - 2023-07-02
### Changed
- Split main classes into EmberNexus and EmberNexusCache.

## 0.0.34 - 2023-07-02
### Changed
- Replace old EmberNexus implementation by a new one.

## 0.0.33 - 2023-06-12
### Changed
- Switched NPM organization from `ember-nexus-tmp` to `ember-nexus`.

## 0.0.32 - 2023-05-30

## 0.0.31 - 2023-05-30

## 0.0.30 - 2023-05-30
### Added
- Add `composed: true` to events.

## 0.0.29 - 2023-04-10

## 0.0.28 - 2023-04-10

## 0.0.27 - 2023-04-10

## 0.0.26 - 2023-04-10
### Added
- Manual dependency injection

## 0.0.25 - 2023-04-07
### Added
- Automatic releases with deployment and signed commits

## 0.0.5 - 2023-04-06
### Added
- Changelog
- CI: Markdown linter
- Add docs folder
- Signed commits enabled, see also [tutorial](https://docs.gitlab.com/ee/user/project/repository/ssh_signed_commits/)
- Change code style commands
  - Support for sorted includes
  - Tests are now included too
- Add logs to existing endpoints
- Change exception messages to include trailing dot, see also [Microsoft's best practices for exceptions](https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions#use-grammatically-correct-error-messages)
- Add [MSW](https://mswjs.io/) for better unit tests, wip
- Improve error and log messages
- Remove yarn.lock, as this is a library
- Add functions EmberNexus.getElement(), .patchElement(), .putElement() and .deleteElement(), add tests for these
  functions
- Update GitHub actions
- Add first events
- Clean up import style
- Temporarily change project name to @ember-nexus-tmp/web-sdk, as name conflict is still not resolved
