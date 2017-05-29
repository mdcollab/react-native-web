const React = require('react');

const Platform = require('../../apis/Platform');
const VirtualizedSectionList = require('../VirtualizedSectionList');


const defaultProps = {
  ...VirtualizedSectionList.defaultProps,
  stickySectionHeadersEnabled: Platform.OS === 'ios',
};

class SectionList<SectionT: SectionBase<any>> extends React.PureComponent<DefaultProps, Props<SectionT>, void>
{
  static defaultProps: DefaultProps = defaultProps;

  scrollToLocation(params: {
    animated?: ?boolean,
    itemIndex: number,
    sectionIndex: number,
    viewOffset?: number,
    viewPosition?: number,
  }) {
    this._wrapperListRef.scrollToLocation(params);
  }

  recordInteraction() {
    const listRef = this._wrapperListRef && this._wrapperListRef.getListRef();
    listRef && listRef.recordInteraction();
  }

  getScrollResponder() {
    const listRef = this._wrapperListRef && this._wrapperListRef.getListRef();
    if (listRef) {
      return listRef.getScrollResponder();
    }
  }

  getScrollableNode() {
    const listRef = this._wrapperListRef && this._wrapperListRef.getListRef();
    if (listRef) {
      return listRef.getScrollableNode();
    }
  }

  render() {
    return <VirtualizedSectionList {...this.props} ref={this._captureRef} />;
  }

  _captureRef = (ref) => { this._wrapperListRef = ref; };
}

module.exports = SectionList;
