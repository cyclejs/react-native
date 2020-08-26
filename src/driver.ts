import {Stream} from 'xstream';
import {ReactSource, makeCycleReactComponent} from '@cycle/react';
import {ReactElement} from 'react';
import {AppRegistry} from 'react-native';

export function makeReactNativeDriver(
  appKey: string,
  {
    registerRootComponent = (Root) =>
      AppRegistry.registerComponent(appKey, () => Root),
  }: {registerRootComponent?: (component: React.ComponentType) => any} = {}
) {
  return function reactNativeDriver(sink: Stream<ReactElement<any>>) {
    const source = new ReactSource();
    const Root = makeCycleReactComponent(() => ({source, sink}));
    registerRootComponent(Root);
    return source;
  };
}
