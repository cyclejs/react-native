# Cycle React Native Driver
## Experimental

**Install:**

```
npm install @cycle/react-native@1.0.0-experimental.12
```

This driver was built as an experiment by @staltz, and improved at the CycleConf 2016 hackathon by @ohanhi, @justinwoo, @chadrien, @sectore, @ozzee and @jevakallio. It contains a collection of ideas and hacks to test feasibility of the Cycle.js architecture on React Native.

## Features

 * Custom `Touchable*` components for event delegation to support lazily created elements (e.g. navigation scenes, ListView rows)
 * Custom `Animated` component to run animations declaratively
 * Custom `ListView` component to manage "infinite scrolling" with `ListView.DataSource`
 * Navigation support with `NavigationExperimental`

See [jevakallio/cycle-react-native-example](https://github.com/jevakallio/cycle-react-native-example) for example of use.

## Running on iOS

Start by installing React Native [prerequisites](https://facebook.github.io/react-native/docs/getting-started.html) (XCode, react-native-cli, watchman).

Then:
```
git clone git@github.com:jevakallio/cycle-react-native.git && cd cycle-react-native
npm install
react-native run-ios
```

## Running on Android

Good luck!

## Usage


```js
let {Rx, run} = require('@cycle/core');
let React = require('react-native');
let {makeReactNativeDriver} = require('@cycle/react-native');
let {StyleSheet, Text, View, Image, StatusBarIOS} = React;

function main({RN}) {
  return {
    RN: RN.select('button').events('press')
      .map(ev => +1)
      .startWith(0)
      .scan((x,y) => x+y)
      .map(i =>
        <View>
          <Text style={styles.button} selector="button">Increment</Text>
          <Text>You have clicked the button {i} times.</Text>
        </View>
      ),
  };
}

run(main, {
  RN: makeReactNativeDriver('MyMobileApp'),
});
```

