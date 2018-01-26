/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Picker
 * @flow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import { Component } from 'react';
import StyleSheet from '../../apis/StyleSheet';
import createElement from '../../modules/createElement';
import PickerItem from './PickerItem';
import PickerItemPropType from './PickerItemPropType';
import PickerStylePropTypes from './PickerStylePropTypes';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextPropTypes from '../Text/TextPropTypes';
import { arrayOf, bool, func, number, oneOfType, string } from 'prop-types';

const pickerStyleType = StyleSheetPropType(PickerStylePropTypes);

type Props = {
  children?: Array<typeof PickerItem>,
  enabled?: boolean,
  onValueChange?: Function,
  selectedValue?: number | string,
  style?: pickerStyleType,
  testID?: string,
  /* compat */
  itemStyle?: TextPropTypes.style,
  mode?: string,
  prompt?: string
};

class Picker extends Component<Props> {
  static propTypes = {
    children: arrayOf(PickerItemPropType),
    enabled: bool,
    onValueChange: func,
    selectedValue: oneOfType([number, string]),
    style: pickerStyleType,
    testID: string
  };

  static Item = PickerItem;

  render() {
    const {
      children,
      enabled,
      selectedValue,
      style,
      testID,
      /* eslint-disable */
      itemStyle,
      mode,
      prompt
      /* eslint-enable */
    } = this.props;

    return createElement('select', {
      children,
      disabled: enabled === false ? true : undefined,
      onChange: this._handleChange,
      style: [styles.initial, style],
      testID,
      value: selectedValue
    });
  }

  _handleChange = (e: Object) => {
    const { onValueChange } = this.props;
    const { selectedIndex, value } = e.target;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  };
}

const styles = StyleSheet.create({
  initial: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin: 0
  }
});

export default applyNativeMethods(Picker);
