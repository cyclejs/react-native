import React from 'react-native';
const {
  Animated,
  PropTypes
} = React;

function createAnimationDongle(className) {
  return React.createClass({
    displayName: 'Cycle' + className,

    propTypes: {
    },

    getInitialState() {
      const currentValue = new Animated.Value(
        this.props.initialValue || 0
      );

      return {
        currentValue
      }
    },

    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.currentValue._value) {
        this.runAnimation(nextProps);
      }
    },

    runAnimation({animation, options = {}, value}) {
      animation(this.state.currentValue, {...options,
        toValue: value
      }).start();
    },

    render() {
      const AnimatedClass = Animated[className];
      const { animate } = this.props;

      const animatedStyle = Object.keys(animate).reduce((acc, key) => {
        return {...acc,
          [key]: this.state.currentValue.interpolate(animate[key])
        }
      }, {});

      const style = {...(this.props.style || {}), ...animatedStyle}

      const extraProps = {
        source: this.props.source
      };

      return (
        <AnimatedClass style={style} {...extraProps}>
          {this.props.children}
        </AnimatedClass>
      );
    }
  });
};


export default {
  View: createAnimationDongle('View'),
  Text: createAnimationDongle('Text'),
  Image: createAnimationDongle('Image')
};

