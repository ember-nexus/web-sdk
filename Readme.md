# Ember Nexus: Web SDK

![GitHub License](https://img.shields.io/github/license/ember-nexus/web-sdk)
[![NPM Version](https://img.shields.io/npm/v/%40ember-nexus%2Fweb-sdk)](https://www.npmjs.com/package/@ember-nexus/web-sdk)
![NPM Downloads](https://img.shields.io/npm/dm/%40ember-nexus%2Fweb-sdk)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/ember-nexus/web-sdk/ci-test.yml?label=CI)
[![codecov](https://codecov.io/gh/ember-nexus/web-sdk/branch/main/graph/badge.svg?token=N4U7IE0DK0)](https://codecov.io/gh/ember-nexus/web-sdk)
[![Discord](https://img.shields.io/discord/1135243882360221787?logo=discord&color=%235865f2)](https://discord.gg/qbQFBrJrRC)

The Web SDK is a library intended to make working with the [Ember Nexus API](https://github.com/ember-nexus/api)
easier.  
It is programmed in a framework-agnostic way.

## Quick Links

- [Check out the documentation](https://ember-nexus.github.io/web-sdk)
- [Find us on NPM](https://www.npmjs.com/package/@ember-nexus/web-sdk)

## Features

Using the Web SDK provides multiple advantages over directly connecting to the API itself:

- **Authentication**: Authentication and token management are handled for you.
- **Caching**: The Web SDK automatically caches elements and reduces unnecessary web requests. Caching can be disabled
  and bypassed for individual element lookups.
- **Events**: All API endpoints can be optionally exposed as browser events. This is especially useful for abstraction
  and modularization; all official Ember Nexus apps do use these events extensively.
- **Type safety**: The SDK is written in TypeScript and uses explicitly defined types all throughout.

## Planned Features

See our [milestone](https://github.com/ember-nexus/web-sdk/milestones) and
[issue](https://github.com/ember-nexus/web-sdk/issues) list on GitHub for planned features.
