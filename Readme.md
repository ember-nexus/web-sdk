# Ember Nexus: Web SDK

The Web SDK is a typescript library intended to be used by developers and separate web applications.
It is programmed in a framework-agnostic way.

## Quick Links

- [Check out the documentation](https://ember-nexus.github.io/web-sdk)
- [Find us on NPM](https://www.npmjs.com/package/@ember-nexus/web-sdk)

Find us on [GitHub](https://github.com/ember-nexus/web-sdk), [our website ember-nexus.dev](https://ember-nexus.dev), and
[Discord](https://discord.gg/3UhupSvMAa).

## Features

Using the Web SDK provides multiple advantages over directly connecting to the API itself:

- **Authentication**: Authentication and token management are handled for you.
- **Caching**: The Web SDK automatically caches elements and reduces unnecessary web requests. Caching can be disabled
  and bypassed for individual element lookups.
- **Events**: All API endpoints can be optionally exposed as browser events. This is especially useful for abstraction
  and modularization; all official Ember Nexus apps do use these events extensively.
- **Type safety**: The SDK is written in Typescript and uses explicitly defined types all throughout.

## Planned Features

See our [milestone](https://github.com/ember-nexus/web-sdk/milestones) and
[issue](https://github.com/ember-nexus/web-sdk/issues) list on GitHub for planned features.
