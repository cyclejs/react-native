import {
  // General
  ActivityIndicator as _ActivityIndicator,
  Button as _Button,
  FlatList as _FlatList,
  Image as _Image,
  KeyboardAvoidingView as _KeyboardAvoidingView,
  Modal as _Modal,
  Pressable as _Pressable,
  RefreshControl as _RefreshControl,
  ScrollView as _ScrollView,
  SectionList as _SectionList,
  StatusBar as _StatusBar,
  Switch as _Switch,
  Text as _Text,
  TextInput as _TextInput,
  TouchableHighlight as _TouchableHighlight,
  TouchableOpacity as _TouchableOpacity,
  TouchableWithoutFeedback as _TouchableWithoutFeedback,
  View as _View,
  // Android
  DrawerLayoutAndroid as _DrawerLayoutAndroid,
  TouchableNativeFeedback as _TouchableNativeFeedback,
  // iOS
  InputAccessoryView as _InputAccessoryView,
  SafeAreaView as _SafeAreaView,
} from 'react-native';
import {makeHelper} from './helper';

export const ActivityIndicator = makeHelper(_ActivityIndicator);
export const Button = makeHelper(_Button);
export const DrawerLayoutAndroid = makeHelper(_DrawerLayoutAndroid);
export const FlatList = makeHelper(_FlatList);
export const Image = makeHelper(_Image);
export const InputAccessoryView = makeHelper(_InputAccessoryView);
export const KeyboardAvoidingView = makeHelper(_KeyboardAvoidingView);
export const Modal = makeHelper(_Modal);
export const RefreshControl = makeHelper(_RefreshControl);
export const ScrollView = makeHelper(_ScrollView);
export const SectionList = makeHelper(_SectionList);
export const StatusBar = makeHelper(_StatusBar);
export const Switch = makeHelper(_Switch);
export const TextInput = makeHelper(_TextInput);
export const Text = makeHelper(_Text);
export const TouchableHighlight = makeHelper(_TouchableHighlight);
export const TouchableNativeFeedback = makeHelper(_TouchableNativeFeedback);
export const TouchableOpacity = makeHelper(_TouchableOpacity);
export const TouchableWithoutFeedback = makeHelper(_TouchableWithoutFeedback);
export const View = makeHelper(_View);
