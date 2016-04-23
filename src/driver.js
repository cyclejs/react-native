import React from 'react-native'
import Rx from 'rx'
const {AppRegistry, View} = React

let handlers = {}

export function registerHandler(selector, evType) {
  handlers[selector] = handlers[selector] || {};
  handlers[selector][evType] = handlers[selector][evType] || new Rx.Subject();
  handlers[selector][evType].send = function sendIntoSubject(...args) {
    handlers[selector][evType].onNext(...args)
  }

  return handlers[selector][evType];
};

export function findHandler(selector, evType) {
  if (handlers[selector].hasOwnProperty(evType)) {
    return handlers[selector][evType].send
  }
}

function isChildReactElement(child) {
  return !!child && typeof child === `object` && child._isReactElement
}

function makeReactNativeDriver(appKey) {
  return function reactNativeDriver(vtree$) {
    function componentFactory() {
      return React.createClass({
        componentWillMount() {
          vtree$.subscribe(newVTree => {
            this.setState({vtree: newVTree})
          })
        },
        getInitialState() {
          return {vtree: React.createElement(View)}
        },
        render() {
          return this.state.vtree
        },
      })
    }

    let response = {
      select: function select(selector) {
        return {
          observable: Rx.Observable.empty(),
          events: function events(evType) {
            return registerHandler(selector, evType);
          },
        }
      },
    }

    AppRegistry.registerComponent(appKey, componentFactory)

    return response
  }
}

export default makeReactNativeDriver
