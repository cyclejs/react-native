import makeReactNativeDriver from './driver'

export default {
  /**
   * A factory for the React Native driver function. Takes an `appKey` string
   * as the only input. The returned driver is a function that takes an
   * Observable of ReactElement as input, and output a queryable collection of
   * user event Observables. This is similar to Cycle DOM Driver.
   * `RN.select(selector).events(eventType)` returns the Observable of
   * `eventType` user events happening on the component which has the specified
   * `selector` property.
   *
   * @param {String} appKey key to refer to the target mobile app.
   * @return {Function} the React Native driver function.
   * @function makeReactNativeDriver
   */
  makeReactNativeDriver,
}
