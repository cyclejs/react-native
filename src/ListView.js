'use strict';

import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

const {
  ListView
} = ReactNative;

export default React.createClass({
  displayName: 'CycleListView',
  propTypes: {
    items: PropTypes.array.isRequired
  },

  getInitialState() {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {dataSource: dataSource.cloneWithRows(this.props.items)};
  },

  componentWillReceiveProps({items}) {
    if (items !== this.props.items) {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(items)});
    }
  },

  getScrollResponder() {
    return this._listView.getScrollResponder();
  },

  render() {
    const {items, ...listViewProps} = this.props;
    return (
      <ListView
        ref={listView => this._listView = listView}
        dataSource={this.state.dataSource}
        {...listViewProps}
      />
    );
  }
});
