import React from 'react-native'
import {Rx} from '@cycle/core'
const {AppRegistry, View} = React

function makeReactNativeDriver(appKey) {
  return function reactNativeDriver(vtree$) {
    let handlers = {}

    function augmentVTreeWithHandlers(vtree, index = null) {
      if (typeof vtree === `string` || typeof vtree === `number`) {
        return vtree
      }
      let newProps = {}
      if (vtree.key === null && index !== null) {
        newProps.key = index
      }
      let wasTouched = false
      if (handlers[vtree.key]) {
        for (let evType in handlers[vtree.key]) {
          if (handlers[vtree.key].hasOwnProperty(evType)) {
            let handlerFnName = `on${evType.charAt(0).toUpperCase()}${evType.slice(1)}`
            newProps[handlerFnName] = handlers[vtree.key][evType].send
            wasTouched = true
          }
        }
      }
      let newChildren = vtree.props.children
      if (Array.isArray(vtree.props.children)) {
        newChildren = vtree.props.children.map(augmentVTreeWithHandlers)
        wasTouched = true
      }
      return wasTouched ? React.cloneElement(vtree, newProps, newChildren) : vtree
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
      select: function select(ref) {
        return {
          observable: Rx.Observable.empty(),
          events: function events(evType) {
            handlers[ref] = handlers[ref] || {}
            handlers[ref][evType] = handlers[ref][evType] || new Rx.Subject()
            handlers[ref][evType].send = function sendIntoSubject(ev = null) {
              handlers[ref][evType].onNext(ev)
            }
            return handlers[ref][evType]
          },
        }
      },
    }

    AppRegistry.registerComponent(appKey, componentFactory)

    return response
  }
}

export default makeReactNativeDriver
