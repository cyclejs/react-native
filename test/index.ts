import 'mocha';
import * as renderer from 'react-test-renderer';
import * as React from 'react';
import xs, {Stream} from 'xstream';
import * as ReactNative from 'react-native';
import {h, ReactSource, makeCycleReactComponent} from '@cycle/react';
import {run} from '@cycle/run';
const assert = require('assert');
const {View, Text} = ReactNative;

class Touchable extends React.PureComponent<any, any> {
  public press() {
    if (this.props.onPress) {
      this.props.onPress(null);
    }
  }

  public render() {
    return this.props.children;
  }
}

describe('React Native driver', function() {
  it('converts an MVI Cycle app into a React component', function(done) {
    function main(sources: {react: ReactSource}) {
      const inc = Symbol();
      const inc$ = sources.react.select(inc).events('press');
      const count$ = inc$.fold((acc: number, x: any) => acc + 1, 0);
      const vdom$ = count$.map((i: number) =>
        h(Touchable, {sel: inc}, [h(View, [h(Text, {}, '' + i)])]),
      );
      return {react: vdom$};
    }

    function testDriver(sink: Stream<React.ReactElement<any>>) {
      let turn = 0;
      const source = new ReactSource();
      const Root = makeCycleReactComponent(() => ({source, sink}));
      const r = renderer.create(React.createElement(Root as any));
      const root = r.root;
      const check = () => {
        const to = root.findByType(Touchable);
        const view = to.props.children;
        const text = view.props.children;
        assert.strictEqual(text.props.children, `${turn}`);
        to.instance.press();
        turn++;
        if (turn === 3) {
          done();
        }
      };
      setTimeout(check, 50);
      setTimeout(check, 100);
      setTimeout(check, 150);
      return source;
    }

    run(main, {react: testDriver});
  });
});
