import { ReactElement, ComponentType } from "react";
import {
  ActivityIndicator as _ActivityIndicator,
  Button as _Button,
  DatePickerIOS as _DatePickerIOS,
  DrawerLayoutAndroid as _DrawerLayoutAndroid,
  FlatList as _FlatList,
  Image as _Image,
  InputAccessoryView as _InputAccessoryView,
  KeyboardAvoidingView as _KeyboardAvoidingView,
  MaskedViewIOS as _MaskedViewIOS,
  Modal as _Modal,
  NavigatorIOS as _NavigatorIOS,
  RefreshControl as _RefreshControl,
  ScrollView as _ScrollView,
  SectionList as _SectionList,
  SnapshotViewIOS as _SnapshotViewIOS,
  StatusBar as _StatusBar,
  Switch as _Switch,
  TabBarIOS as _TabBarIOS,
  TextInput as _TextInput,
  Text as _Text,
  ToolbarAndroid as _ToolbarAndroid,
  TouchableHighlight as _TouchableHighlight,
  TouchableNativeFeedback as _TouchableNativeFeedback,
  TouchableOpacity as _TouchableOpacity,
  TouchableWithoutFeedback as _TouchableWithoutFeedback,
  View as _View,
} from "react-native";
import { h } from "@cycle/react";

function parseSelector(param: any) {
  if (typeof param === "symbol") return param;
  if (typeof param === "string" && param.length > 0) return param;
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
    const hasA = typeof a !== "undefined";
    const hasB = typeof b !== "undefined";
    const hasBChildren = Array.isArray(b) || typeof b === "string";
    const hasC = typeof c !== "undefined";
    const sel = parseSelector(a);
    if (sel) {
      if (hasB && hasC) {
        return h(type, { ...b, sel }, c);
      } else if (hasB && hasBChildren) {
        return h(type, { sel } as any, b as Array<ReactElement<any>>);
      } else if (hasB) {
        return h(type, { ...b, sel });
      } else if (typeof sel === "symbol") {
        return h(type, { sel } as any);
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

export const ActivityIndicator = makeHelper(_ActivityIndicator);
export const Button = makeHelper(_Button);
export const DrawerLayoutAndroid = makeHelper(_DrawerLayoutAndroid);
export const FlatList = makeHelper(_FlatList);
export const Image = makeHelper(_Image);
export const InputAccessoryView = makeHelper(_InputAccessoryView);
export const KeyboardAvoidingView = makeHelper(_KeyboardAvoidingView);
export const MaskedViewIOS = makeHelper(_MaskedViewIOS);
export const Modal = makeHelper(_Modal);
export const NavigatorIOS = makeHelper(_NavigatorIOS);
export const RefreshControl = makeHelper(_RefreshControl);
export const ScrollView = makeHelper(_ScrollView);
export const SectionList = makeHelper(_SectionList);
export const SnapshotViewIOS = makeHelper(_SnapshotViewIOS);
export const StatusBar = makeHelper(_StatusBar);
export const Switch = makeHelper(_Switch);
export const TabBarIOS = makeHelper(_TabBarIOS);
export const TextInput = makeHelper(_TextInput);
export const Text = makeHelper(_Text);
export const ToolbarAndroid = makeHelper(_ToolbarAndroid);
export const TouchableHighlight = makeHelper(_TouchableHighlight);
export const TouchableNativeFeedback = makeHelper(_TouchableNativeFeedback);
export const TouchableOpacity = makeHelper(_TouchableOpacity);
export const TouchableWithoutFeedback = makeHelper(_TouchableWithoutFeedback);
export const View = makeHelper(_View);
