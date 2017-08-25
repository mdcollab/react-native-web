/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule MetroListView
 * @flow
 * @format
 */
'use strict';

const React = require('react');
const View = require('../View');

/**
 * This is just a wrapper around the legacy ListView that matches the new API of FlatList, but with
 * some section support tacked on. It is recommended to just use FlatList directly, this component
 * is mostly for debugging and performance comparison.
 */
class MetroListView extends React.Component {
  render() {
    return (
      <View />
    );
  }
}

module.exports = MetroListView;
