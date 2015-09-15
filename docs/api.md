
# `CycleReactNative` object API

- [`makeReactNativeDriver`](#makeReactNativeDriver)

### <a id="makeReactNativeDriver"></a> `makeReactNativeDriver(appKey)`

A factory for the React Native driver function. Takes an `appKey` string
as the only input. The returned driver is a function that takes an
Observable of ReactElement as input, and output a queryable collection of
user event Observables. This is similar to Cycle DOM Driver.
`RN.select(key).events(eventType)` returns the Observable of `eventType`
user events happening on the component which has the specified `key`
property.

#### Arguments:

- `appKey :: String` key to refer to the target mobile app.

#### Return:

*(Function)* the React Native driver function.

- - -

