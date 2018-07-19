# Cycle React Native

> Cycle.js driver that uses React Native to render

- Provides a driver factory `makeReactNativeDriver`
- Contains hyperscript helper functions, such as `View()`, `Text()`, etc

```
npm install @cycle/react-native
```

## Example

```js
import xs from 'xstream';
import {run} from '@cycle/run';
import {makeReactNativeDriver, TouchableOpacity, View, Text} from '@cycle/react-native';

function main(sources) {
  const inc = Symbol();
  const inc$ = sources.react.select(inc).events('click');

  const count$ = inc$.fold(count => count + 1, 0);

  const elem$ = count$.map(i =>
    TouchableOpacity(inc, [
      View([
        Text(`Counter: ${i}`),
      ])
    ]),
  );

  return {
    react: elem$,
  };
}

run(main, {
  react: makeReactNativeDriver('MyApp'),
});
```

## Installation

Start by installing React Native prerequisites (XCode, react-native-cli, watchman).

Then create a React Native project using the CLI.

When the project is set up, npm install `@cycle/react-native`, `@cycle/run`, and a stream library like `xstream`, then replace the index.js with something that looks like the example code in this readme.

## API

### `makeReactNativeDriver(appKey)`

Returns a driver that uses React Native to render your Cycle.js app in the native application known by the string `appKey`.

### Hyperscript helpers

Import hyperscript helpers such as `View`, `Text`, `TouchableOpacity`, etc to create React elements to represent the respective built-in native components: `<View>`, `<Text>`, `<TouchableOpacity>`, etc.

The basic usage is `View(props, children)`, but some variations and shortcuts are allowed:

- `View()` becomes `<View/>`
- `View(props)` becomes `<View {...props}></View>`
- `Text('text content')` becomes `<Text>text content</Text>`
- `View([child1, child2])`
- `Text(props, 'text content')`
- `View(props, [child1, child2])`
- etc

There are also shortcuts for (MVI) intent selectors:

- `Touchable(someSymbol)` becomes `h(Touchable, {sel: someSymbol})`
- `Touchable(sym, props)` becomes `h(Touchable, {sel: sym, ...props})`
- `Text('myselector', 'text content')`
- `Touchable('inc', [child])`
- `Touchable('inc', propsObject, [child])`
- etc

For non-built-in components (e.g. third party) components, you can use `h(ThirdPartyComponent)` with `h` from `@cycle/react` or you can build a helper using `makeHelper(ThirdPartyComponent)` with `makeHelper` from `@cycle/react-native`.

## Other native drivers

This library only covers React components in React Native and View-related rendering. For other native APIs in React Native, use drivers specifically built for those. See the list below:

- [cycle-native-alert](https://gitlab.com/staltz/cycle-native-alert)
- [cycle-native-keyboard](https://gitlab.com/staltz/cycle-native-keyboard)

## License

MIT, Andre 'Staltz' Medeiros 2018

