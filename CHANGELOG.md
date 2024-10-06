# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Changed
- Enable originstamp integration, closes #87.

## 0.0.64 - 2024-10-06
### Added
- Remaining unit tests for user endpoints.

### Changed
- Improve code quality through more eslint rules and plugins, closes [#98].

### Fixed
- Fix bug in register endpoint, where successful responses could not be parsed, closes [#93].

## 0.0.63 - 2024-10-06
### Added
- Print warning if trailing slashes in API host configuration are found, and automatically removes them, closes [#92].

### Fixed
- Fixed deprecated ts-jest configuration under globals keyword, "Define `ts-jest` config under `globals` is deprecated.".
- Removed trailing `v` from version number, fixes [#88].

## 0.0.62 - 2024-10-01

## 0.0.61 - 2024-09-22
### Fixed
- Fix bug where import without `index.js` led to downstream issues, closes [#90].

## 0.0.60 - 2024-07-12
### Fixed
- Fix `types` attribute in `package.json`, closes [#85].

## 0.0.59 - 2024-07-11
### Changed
- **Breaking**: Changed browser event namespace from `ember-nexus-` to `ember-nexus-sdk-`, closes [#83].

## 0.0.58 - 2024-07-08
### Changed
- Fix typo.
- Fix package.json.
- Remove unnecessary dependencies.
- Upgrade dependencies, especially eslint and typescript.

## 0.0.57 - 2024-06-06

## 0.0.56 - 2024-06-04

## 0.0.55 - 2024-06-04

## 0.0.54 - 2024-06-03
### Added
- Add Codecov support.

### Changed
- Increase unit test coverage.

## 0.0.53 - 2024-05-26

## 0.0.52 - 2024-05-26

## 0.0.51 - 2024-05-26

## 0.0.50 - 2024-05-26

## 0.0.49 - 2024-05-26

## 0.0.48 - 2024-05-26
### Changed
- Refactor build system, inspired by tslog.

## 0.0.47 - 2024-05-22
### Changed
- Refactor imports to use relative imports instead of custom alias (broke third party imports).
- Change file ending of type files from `d.ts` to `.ts` so that they can be exported automatically as well.
- Brake tests intentionally - will be fixed in a later release.

## 0.0.46 - 2024-05-21

## 0.0.43 - 2024-05-21

## 0.0.42 - 2024-05-21

## 0.0.41 - 2024-05-21
- Add module export.
- Change release script to upload NPM package to GitHub release.

## 0.0.40 - 2024-05-21

## 0.0.39 - 2024-05-06
### Added
- Typedoc for SDK documentation.
- Rebuilt browser events for element and user endpoints.
- Rebuilt endpoint classes with better error handling and more solid parsing and validation code.
- Add support for Node.js v22.
- Implement `GetIndexEvent`, closes [#56].
- Implement `GetElementEvent`, closes [#55].
- Implement `GetParentsEvent`, closes [#57].
- Implement `GetChildrenEvent`, closes [#54].
- Implement `GetRelatedEvent`, closes [#58].
- Implement `PostIndexEvent`, closes [#61].
- Implement `PostElementEvent`, closes [#60].
- Implement `PutElementEvent`, closes [#62].
- Implement `PatchElementEvent`, closes [#59].
- Implement `DeleteElementEvent`, closes [#53].

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
