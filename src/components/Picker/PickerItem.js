import { Component } from 'react';
import ColorPropType from '../../propTypes/ColorPropType';
import createElement from '../../modules/createElement';
import { number, oneOfType, string } from 'prop-types';

type Props = {
  color?: ColorPropType,
  label: string,
  testID?: string,
  value?: number | string
};

export default class PickerItem extends Component<Props> {
  static propTypes = {
    color: ColorPropType,
    label: string.isRequired,
    testID: string,
    value: oneOfType([number, string])
  };

  render() {
    const { label, testID, value } = this.props;
    return createElement('option', { testID, value }, label);
  }
}
