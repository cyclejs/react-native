import {ReactElement, ComponentType} from 'react';
import {h} from '@cycle/react';

function parseSelector(param: any) {
  if (typeof param === 'symbol') return param;
  if (typeof param === 'string' && param.length > 0) return param;
  return null;
}

export type Children = Array<ReactElement<any>> | string;

export type HelperSig<P> = {
  (sel: symbol): ReactElement<P>;
  (child: string): ReactElement<P>;
  (props: P): ReactElement<P>;
  (children: Children): ReactElement<P>;
  (sel: string | symbol, props: P): ReactElement<P>;
  (props: P, children: Children): ReactElement<P>;
  (sel: string | symbol, children: Children): ReactElement<P>;
  (sel: string | symbol, props: P, children: Children): ReactElement<P>;
};

export function makeHelper<P>(type: ComponentType<P>): HelperSig<P> {
  return function helper(a?: any, b?: any, c?: any): ReactElement<P> {
    const hasA = typeof a !== 'undefined';
    const hasB = typeof b !== 'undefined';
    const hasBChildren = Array.isArray(b) || typeof b === 'string';
    const hasC = typeof c !== 'undefined';
    const sel = parseSelector(a);
    if (sel) {
      if (hasB && hasC) {
        return h(type, {...b, sel}, c);
      } else if (hasB && hasBChildren) {
        return h(type, {sel} as any, b as Array<ReactElement<any>>);
      } else if (hasB) {
        return h(type, {...b, sel});
      } else if (typeof sel === 'symbol') {
        return h(type, {sel} as any);
      } else {
        return h(type, sel as any /* child, not a sel */);
      }
    } else if (hasC) {
      return h(type, b, c);
    } else if (hasB) {
      return h(type, a, b);
    } else if (hasA) {
      return h(type, a);
    } else {
      return h(type);
    }
  };
}
