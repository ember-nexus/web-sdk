# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

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
