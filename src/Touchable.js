'use strict';

import React from 'react-native';
import {findHandler} from './driver';
const {
  View,
  PropTypes
} = React;

function createTouchableClass(className) {
  return React.createClass({
    displayName: 'Cycle' + className,
    propTypes: {
      selector: PropTypes.string.isRequired,
    },
    setNativeProps(props) {
      this._touchable.setNativeProps(props);
    },
    render() {
      const TouchableClass = React[className];
      const {selector, ...props} = this.props;
      return (
        <TouchableClass
          ref={view => this._touchable = view}
          onPress={findHandler(selector, 'press')}
          onPressIn={findHandler(selector, 'pressIn')}
          onPressOut={findHandler(selector, 'pressOut')}
          onLongPress={findHandler(selector, 'longPress')}
          >
          <View {...props}>
            {this.props.children}
          </View>
        </TouchableClass>
      );
    }
  });
}

export default {
  TouchableOpacity: createTouchableClass('TouchableOpacity'),
  TouchableWithoutFeedback: createTouchableClass('TouchableWithoutFeedback'),
  TouchableHighlight: createTouchableClass('TouchableHighlight'),
  TouchableNativeFeedback: createTouchableClass('TouchableNativeFeedback')
};
