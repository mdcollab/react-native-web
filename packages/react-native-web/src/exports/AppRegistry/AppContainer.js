/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ComponentType, Context } from 'react';

import StyleSheet from '../StyleSheet';
import View from '../View';
import Alert from '../Alert';
import React, { createContext } from 'react';

type Context = {
  rootTag: any
};

type Props = {
  WrapperComponent?: ?ComponentType<*>,
  // $FlowFixMe
  children?: React.Children,
  rootTag: any
};

const RootTagContext: Context<any> = createContext(null);

export default function AppContainer(props: Props) {
  const { children, WrapperComponent } = props;

  let innerView = (
    <View children={children} key={1} pointerEvents="box-none" style={styles.appContainer} />
  );

  if (WrapperComponent) {
    innerView = <WrapperComponent>{innerView}</WrapperComponent>;
  }

  return (
    <RootTagContext.Provider value={props.rootTag}>
      <View pointerEvents="box-none" style={styles.appContainer}>
        {innerView}
        <Alert.AlertView />
      </View>
    </RootTagContext.Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});
