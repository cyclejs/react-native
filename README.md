# Cycle React Native Driver
## Experimental

```
npm install @cycle/react-native@1.0.0-experimental.11
```

## Usage

```js
let {Rx, run} = require('@cycle/core');
let React = require('react-native');
let {makeReactNativeDriver} = require('@cycle/react-native');
let {StyleSheet, Text, View, Image, StatusBarIOS} = React;

function main({RN}) {
  return {
    RN: RN.select('button').events('press')
      .map(() => +1)
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
