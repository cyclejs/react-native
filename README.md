# Cycle React Native Driver
## Experimental


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
