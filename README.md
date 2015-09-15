# Cycle React Native Driver
## Experimental

```
npm install @cycle/react-native@1.0.0-experimental
```

## Usage

```js
function main({RN}) {
  return {
    RN: RN.select('button').events('press')
      .map(() => +1)
      .startWith(0)
      .scan((x,y) => x+y)
      .map(i =>
        <View>
          <Text style={styles.button} key="button">Increment</Text>
          <Text>You have clicked the button {i} times.</Text>
        </View>
      ),
  };
}

Cycle.run(main, {
  RN: makeReactNativeDriver('MyMobileApp'),
});
```
