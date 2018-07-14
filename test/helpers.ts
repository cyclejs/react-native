import 'mocha';
import * as renderer from 'react-test-renderer';
import * as React from 'react';
import xs, {Stream} from 'xstream';
import {h, ReactSource, makeCycleReactComponent} from '@cycle/react';
import {run} from '@cycle/run';
import {makeHelper, View, Text} from '../src/index';
import {View as _View} from 'react-native';
const assert = require('assert');

class _Touchable extends React.PureComponent<any, any> {
  public press() {
    if (this.props.onPress) {
      this.props.onPress(null);
    }
  }

  public render() {
    return this.props.children;
  }
}

describe('helpers', function() {
  it('Touchable w/ selector, Text w/ text child, View w/ children', done => {
    const Touchable = makeHelper(_Touchable);

    function main(sources: {react: ReactSource}) {
      const inc$ = sources.react.select('button').events('press');
      const count$ = inc$.fold((acc: number, x: any) => acc + 1, 0);
      const vdom$ = count$.map((i: number) =>
        Touchable('button', [View([Text('' + i)])]),
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
        const to = root.findByType(_Touchable);
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

  it('View w/ symbol selector', done => {
    function main(sources: {react: ReactSource}) {
      const foo = Symbol();
      const vdom$ = xs.of(View(foo));
      return {react: vdom$};
    }

    function testDriver(sink: Stream<React.ReactElement<any>>) {
      const source = new ReactSource();
      const Root = makeCycleReactComponent(() => ({source, sink}));
      const r = renderer.create(React.createElement(Root as any));
      const root = r.root;
      setTimeout(() => {
        const view = root.findByType(_View);
        assert.strictEqual(!!view, true);
        done();
      }, 50);
      return source;
    }

    run(main, {react: testDriver});
  });

  it('View w/ selector and props', done => {
    function main(sources: {react: ReactSource}) {
      const vdom$ = xs.of(View('foo', {accessible: true}));
      return {react: vdom$};
    }

    function testDriver(sink: Stream<React.ReactElement<any>>) {
      const source = new ReactSource();
      const Root = makeCycleReactComponent(() => ({source, sink}));
      const r = renderer.create(React.createElement(Root as any));
      const root = r.root;
      setTimeout(() => {
        const view = root.findByType(_View);
        assert.strictEqual(view.props.accessible, true);
        done();
      }, 50);
      return source;
    }

    run(main, {react: testDriver});
  });

  it('View w/ selector and children', done => {
    function main(sources: {react: ReactSource}) {
      const vdom$ = xs.of(View('foo', [Text('hello world')]));
      return {react: vdom$};
    }

    function testDriver(sink: Stream<React.ReactElement<any>>) {
      const source = new ReactSource();
      const Root = makeCycleReactComponent(() => ({source, sink}));
      const r = renderer.create(React.createElement(Root as any));
      const root = r.root;
      setTimeout(() => {
        const view = root.findByType(_View);
        const text = view.props.children;
        assert.strictEqual(text.props.children, 'hello world');
        done();
      }, 50);
      return source;
    }

    run(main, {react: testDriver});
  });

  it('View w/ selector and props and children', done => {
    function main(sources: {react: ReactSource}) {
      const vdom$ = xs.of(
        View('foo', {accessible: true}, [Text('hello world')]),
      );
      return {react: vdom$};
    }

    function testDriver(sink: Stream<React.ReactElement<any>>) {
      const source = new ReactSource();
      const Root = makeCycleReactComponent(() => ({source, sink}));
      const r = renderer.create(React.createElement(Root as any));
      const root = r.root;
      setTimeout(() => {
        const view = root.findByType(_View);
        const text = view.props.children;
        assert.strictEqual(view.props.accessible, true);
        assert.strictEqual(text.props.children, 'hello world');
        done();
      }, 50);
      return source;
    }

    run(main, {react: testDriver});
  });

  it('View w/ props and children', done => {
    function main(sources: {react: ReactSource}) {
      const vdom$ = xs.of(View({accessible: true}, [Text('hello world')]));
      return {react: vdom$};
    }

    function testDriver(sink: Stream<React.ReactElement<any>>) {
      const source = new ReactSource();
      const Root = makeCycleReactComponent(() => ({source, sink}));
      const r = renderer.create(React.createElement(Root as any));
      const root = r.root;
      setTimeout(() => {
        const view = root.findByType(_View);
        const text = view.props.children;
        assert.strictEqual(view.props.accessible, true);
        assert.strictEqual(text.props.children, 'hello world');
        done();
      }, 50);
      return source;
    }

    run(main, {react: testDriver});
  });

  it('Text w/ selector and text child', done => {
    function main(sources: {react: ReactSource}) {
      const vdom$ = xs.of(View([Text('foo', 'hello world')]));
      return {react: vdom$};
    }

    function testDriver(sink: Stream<React.ReactElement<any>>) {
      const source = new ReactSource();
      const Root = makeCycleReactComponent(() => ({source, sink}));
      const r = renderer.create(React.createElement(Root as any));
      const root = r.root;
      setTimeout(() => {
        const view = root.findByType(_View);
        const text = view.props.children;
        assert.strictEqual(text.props.children, 'hello world');
        done();
      }, 50);
      return source;
    }

    run(main, {react: testDriver});
  });
});
