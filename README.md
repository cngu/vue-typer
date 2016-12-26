# vue-typer
Vue component that simulates a user typing, selecting, and deleting text.

## Vue Compatibility
Vue v2.x

[See here for migration instructions from Vue 1.x to 2.x.](https://vuejs.org/v2/guide/migration.html)

## Demo
TODO

## Install
TODO

## Usage
TODO

## Props
TODO

## Events
TODO

## Styles
TODO

## Changelog
TODO

## TODO
- [ ] Update to stable releases of:
  - webpack
  - webpack-dev-server
  - extract-text-webpack-plugin
- [ ] Revisit community discussions around the best way to obtain deterministic hashes so we can remove HashedModuleIdsPlugin
- [ ] Potential features (contributions are welcome!):
  - start typing only when VueTyper is on-screen; potentially pause typing when off-screen
  - smarter typing algorithm: erase only up to the longest common starting substring
  - is it worth it to eliminate time-drifting from setInterval? If so, it could be a self-correcting interval (implemented as a series of timeouts)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Chris Nguyen. All rights reserved.
