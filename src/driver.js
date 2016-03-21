import React from 'react-native'
import Rx from 'rx'
const {AppRegistry, View} = React

function isChildReactElement(child) {
  return !!child && typeof child === `object` && child._isReactElement
}

function makeReactNativeDriver(appKey) {
  return function reactNativeDriver(vtree$) {
    let handlers = {}

    function augmentVTreeWithHandlers(vtree, index = null) {
      if (typeof vtree === `string` || typeof vtree === `number`) {
        return vtree
      }
      let newProps = {}
      if (!vtree.props.selector && !!index) {
        newProps.selector = index
      }
      let wasTouched = false
      if (handlers[vtree.props.selector]) {
        for (let evType in handlers[vtree.props.selector]) {
          if (handlers[vtree.props.selector].hasOwnProperty(evType)) {
            let handlerFnName = `on${evType.charAt(0).toUpperCase()}${evType.slice(1)}`
            newProps[handlerFnName] = handlers[vtree.props.selector][evType].send
            wasTouched = true
          }
        }
      }
      let children = vtree.props.children
      if (Array.isArray(vtree.props.children)) {
        return React.cloneElement(vtree, newProps,
          ...children.map(augmentVTreeWithHandlers))
      } else if (isChildReactElement(vtree.props.children)) {
        return React.cloneElement(vtree, newProps,
          augmentVTreeWithHandlers(children))
      } else if (wasTouched) {
        return React.cloneElement(vtree, newProps, children)
      }
      return vtree
    }

    function componentFactory() {
      return React.createClass({
        componentWillMount() {
          vtree$.subscribe(rawVTree => {
            let replacedVTree = augmentVTreeWithHandlers(rawVTree)
            this.setState({vtree: replacedVTree})
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
            handlers[selector] = handlers[selector] || {}
            handlers[selector][evType] = handlers[selector][evType] || new Rx.Subject()
            handlers[selector][evType].send = function sendIntoSubject(...args) {
              const props = this
              const event = {currentTarget: {props}, args}
              handlers[selector][evType].onNext(event)
            }
            return handlers[selector][evType]
          },
        }
      },
    }

    AppRegistry.registerComponent(appKey, componentFactory)

    return response
  }
}

export default makeReactNativeDriver
