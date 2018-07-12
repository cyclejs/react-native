import {Stream} from 'xstream';
import {ReactElement, ComponentType} from 'react';
import {
  AppRegistry,
  ActivityIndicator as _ActivityIndicator,
  Button as _Button,
  DatePickerIOS as _DatePickerIOS,
  DrawerLayoutAndroid as _DrawerLayoutAndroid,
  FlatList as _FlatList,
  Image as _Image,
  InputAccessoryView as _InputAccessoryView,
  KeyboardAvoidingView as _KeyboardAvoidingView,
  ListView as _ListView,
  MaskedViewIOS as _MaskedViewIOS,
  Modal as _Modal,
  NavigatorIOS as _NavigatorIOS,
  Picker as _Picker,
  PickerIOS as _PickerIOS,
  ProgressBarAndroid as _ProgressBarAndroid,
  ProgressViewIOS as _ProgressViewIOS,
  RefreshControl as _RefreshControl,
  ScrollView as _ScrollView,
  SectionList as _SectionList,
  SegmentedControlIOS as _SegmentedControlIOS,
  Slider as _Slider,
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
  ViewPagerAndroid as _ViewPagerAndroid,
  WebView as _WebView,
  View as _View,
  ImageProps,
  InputAccessoryViewProps,
  KeyboardAvoidingViewProps,
  ListViewProps,
  MaskedViewIOSProps,
  ModalProps,
  NavigatorIOSProps,
  PickerProps,
  PickerIOSProps,
  ProgressBarAndroidProps,
  ProgressViewIOSProps,
  RefreshControlProps,
  ScrollViewProps,
  SectionListProps,
  SegmentedControlIOSProps,
  SliderProps,
  SnapshotViewIOSProps,
  StatusBarProps,
  SwitchProps,
  TabBarIOSProps,
  TextInputProps,
  ToolbarAndroidProps,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
  ViewPagerAndroidProps,
  VirtualizedListProps,
  WebViewProps,
  ViewProps,
  TextProps,
  ActivityIndicatorProps,
  ButtonProps,
  DatePickerIOSProps,
  DrawerLayoutAndroidProps,
  FlatListProps,
} from 'react-native';
import {ReactSource, makeCycleReactComponent, h} from '@cycle/react';

export function makeReactNativeDriver(appKey: string) {
  return function reactNativeDriver(sink: Stream<ReactElement<any>>) {
    const source = new ReactSource();
    const Root = makeCycleReactComponent(() => ({source, sink}));
    AppRegistry.registerComponent(appKey, () => Root);
    return source;
  };
}

function parseSelector(param: any) {
  if (typeof param === 'string' && param.length > 0) {
    return param;
  } else {
    return null;
  }
}

export type Children = Array<ReactElement<any>> | string;

export type HelperSig<P> = {
  (sel: string): ReactElement<P>;
  (props: P): ReactElement<P>;
  (children: Children): ReactElement<P>;
  (sel: string, props: P): ReactElement<P>;
  (props: P, children: Children): ReactElement<P>;
  (sel: string, children: Children): ReactElement<P>;
  (sel: string, props: P, children: Children): ReactElement<P>;
};

export function makeHelper<P>(type: ComponentType<P>): HelperSig<P> {
  return function helper(a?: any, b?: any, c?: any): ReactElement<P> {
    const hasA = typeof a !== 'undefined';
    const hasB = typeof b !== 'undefined';
    const hasBChildren = Array.isArray(b) || typeof b === 'string';
    const hasC = typeof c !== 'undefined';
    const selector = parseSelector(a);
    if (selector) {
      if (hasB && hasC) {
        return h(type, {...b, selector}, c);
      } else if (hasB && hasBChildren) {
        return h(type, {selector} as any, b as Array<ReactElement<any>>);
      } else if (hasB) {
        return h(type, {...b, selector});
      } else {
        return h(type, selector as any /* child, not a selector */);
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

export const ActivityIndicator = makeHelper<ActivityIndicatorProps>(
  _ActivityIndicator,
);
export const Button = makeHelper<ButtonProps>(_Button);
export const DatePickerIOS = makeHelper<DatePickerIOSProps>(_DatePickerIOS);
export const DrawerLayoutAndroid = makeHelper<DrawerLayoutAndroidProps>(
  _DrawerLayoutAndroid,
);
export const FlatList = makeHelper<FlatListProps<any>>(_FlatList);
export const Image = makeHelper<ImageProps>(_Image);
export const InputAccessoryView = makeHelper<InputAccessoryViewProps>(
  _InputAccessoryView,
);
export const KeyboardAvoidingView = makeHelper<KeyboardAvoidingViewProps>(
  _KeyboardAvoidingView,
);
export const ListView = makeHelper<ListViewProps>(_ListView);
export const MaskedViewIOS = makeHelper<MaskedViewIOSProps>(_MaskedViewIOS);
export const Modal = makeHelper<ModalProps>(_Modal);
export const NavigatorIOS = makeHelper<NavigatorIOSProps>(_NavigatorIOS);
export const Picker = makeHelper<PickerProps>(_Picker);
export const PickerIOS = makeHelper<PickerIOSProps>(_PickerIOS);
export const ProgressBarAndroid = makeHelper<ProgressBarAndroidProps>(
  _ProgressBarAndroid,
);
export const ProgressViewIOS = makeHelper<ProgressViewIOSProps>(
  _ProgressViewIOS,
);
export const RefreshControl = makeHelper<RefreshControlProps>(_RefreshControl);
export const ScrollView = makeHelper<ScrollViewProps>(_ScrollView);
export const SectionList = makeHelper<SectionListProps<any>>(_SectionList);
export const SegmentedControlIOS = makeHelper<SegmentedControlIOSProps>(
  _SegmentedControlIOS,
);
export const Slider = makeHelper<SliderProps>(_Slider);
export const SnapshotViewIOS = makeHelper<SnapshotViewIOSProps>(
  _SnapshotViewIOS,
);
export const StatusBar = makeHelper<StatusBarProps>(_StatusBar);
export const Switch = makeHelper<SwitchProps>(_Switch);
export const TabBarIOS = makeHelper<TabBarIOSProps>(_TabBarIOS);
export const TextInput = makeHelper<TextInputProps>(_TextInput);
export const Text = makeHelper<TextProps>(_Text);
export const ToolbarAndroid = makeHelper<ToolbarAndroidProps>(_ToolbarAndroid);
export const TouchableHighlight = makeHelper<TouchableHighlightProps>(
  _TouchableHighlight,
);
export const TouchableNativeFeedback = makeHelper<TouchableNativeFeedbackProps>(
  _TouchableNativeFeedback,
);
export const TouchableOpacity = makeHelper<TouchableOpacityProps>(
  _TouchableOpacity,
);
export const TouchableWithoutFeedback = makeHelper<
  TouchableWithoutFeedbackProps
>(_TouchableWithoutFeedback);
export const ViewPagerAndroid = makeHelper<ViewPagerAndroidProps>(
  _ViewPagerAndroid,
);
export const WebView = makeHelper<WebViewProps>(_WebView);
export const View = makeHelper<ViewProps>(_View);
