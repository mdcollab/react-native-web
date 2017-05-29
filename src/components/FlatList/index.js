const React = require('react');
const invariant = require('fbjs/lib/invariant');

const View = require('../View');
const VirtualizedList = require('../VirtualizedList');
const applyNativeMethods = require('../../modules/applyNativeMethods');


const defaultProps = {
  ...VirtualizedList.defaultProps,
  numColumns: 1,
};

class FlatList<ItemT> extends React.PureComponent<DefaultProps, Props<ItemT>, void> {
  static defaultProps: DefaultProps = defaultProps;

  scrollToEnd(params?: ?{animated?: ?boolean}) {
    this._listRef.scrollToEnd(params);
  }

  scrollToIndex(params: {
    animated?: ?boolean, index: number, viewOffset?: number, viewPosition?: number,
  }) {
    this._listRef.scrollToIndex(params);
  }

  scrollToItem(params: {animated?: ?boolean, item: ItemT, viewPosition?: number}) {
    this._listRef.scrollToItem(params);
  }

  scrollToOffset(params: {animated?: ?boolean, offset: number}) {
    this._listRef.scrollToOffset(params);
  }

  recordInteraction() {
    this._listRef.recordInteraction();
  }

  getScrollResponder() {
    if (this._listRef) {
      return this._listRef.getScrollResponder();
    }
  }

  getScrollableNode() {
    if (this._listRef) {
      return this._listRef.getScrollableNode();
    }
  }

  componentWillMount() {
    this._checkProps(this.props);
  }

  componentWillReceiveProps(nextProps: Props<ItemT>) {
    invariant(
      nextProps.numColumns === this.props.numColumns,
      'Changing numColumns on the fly is not supported. Change the key prop on FlatList when ' +
      'changing the number of columns to force a fresh render of the component.'
    );
    this._checkProps(nextProps);
  }

  _hasWarnedLegacy = false;
  _listRef: VirtualizedList;

  _captureRef = (ref) => { this._listRef = ref; };

  _checkProps(props: Props<ItemT>) {
    const {
      getItem,
      getItemCount,
      horizontal,
      legacyImplementation,
      numColumns,
      columnWrapperStyle,
    } = props;
    invariant(!getItem && !getItemCount, 'FlatList does not support custom data formats.');
    if (numColumns > 1) {
      invariant(!horizontal, 'numColumns does not support horizontal.');
    } else {
      invariant(!columnWrapperStyle, 'columnWrapperStyle not supported for single column lists');
    }
    if (legacyImplementation) {
      invariant(numColumns === 1, 'Legacy list does not support multiple columns.');
      // Warning: may not have full feature parity and is meant more for debugging and performance
      // comparison.
      if (!this._hasWarnedLegacy) {
        console.warn(
          'FlatList: Using legacyImplementation - some features not supported and performance ' +
          'may suffer'
        );
        this._hasWarnedLegacy = true;
      }
    }
  }

  _getItem = (data: Array<ItemT>, index: number) => {
    const {numColumns} = this.props;
    if (numColumns > 1) {
      const ret = [];
      for (let kk = 0; kk < numColumns; kk++) {
        const item = data[index * numColumns + kk];
        item && ret.push(item);
      }
      return ret;
    } else {
      return data[index];
    }
  };

  _getItemCount = (data: ?Array<ItemT>): number => {
    return data ? Math.ceil(data.length / this.props.numColumns) : 0;
  };

  _keyExtractor = (items: ItemT | Array<ItemT>, index: number) => {
    const {keyExtractor, numColumns} = this.props;
    if (numColumns > 1) {
      invariant(
        Array.isArray(items),
        'FlatList: Encountered internal consistency error, expected each item to consist of an ' +
        'array with 1-%s columns; instead, received a single item.',
        numColumns,
      );
      return items.map((it, kk) => keyExtractor(it, index * numColumns + kk)).join(':');
    } else {
      return keyExtractor(items, index);
    }
  };

  _pushMultiColumnViewable(arr: Array<ViewToken>, v: ViewToken): void {
    const {numColumns, keyExtractor} = this.props;
    v.item.forEach((item, ii) => {
      invariant(v.index != null, 'Missing index!');
      const index = v.index * numColumns + ii;
      arr.push({...v, item, key: keyExtractor(item, index), index});
    });
  }

  _onViewableItemsChanged = (info) => {
    const {numColumns, onViewableItemsChanged} = this.props;
    if (!onViewableItemsChanged) {
      return;
    }
    if (numColumns > 1) {
      const changed = [];
      const viewableItems = [];
      info.viewableItems.forEach((v) => this._pushMultiColumnViewable(viewableItems, v));
      info.changed.forEach((v) => this._pushMultiColumnViewable(changed, v));
      onViewableItemsChanged({viewableItems, changed});
    } else {
      onViewableItemsChanged(info);
    }
  };

  _renderItem = (info: Object) => {
    const {renderItem, numColumns, columnWrapperStyle} = this.props;
    if (numColumns > 1) {
      const {item, index} = info;
      invariant(Array.isArray(item), 'Expected array of items with numColumns > 1');
      return (
        <View style={[{flexDirection: 'row'}, columnWrapperStyle]}>
          {item.map((it, kk) => {
            const element = renderItem({
              item: it,
              index: index * numColumns + kk,
              separators: info.separators,
            });
            return element && React.cloneElement(element, {key: kk});
          })}
        </View>
      );
    } else {
      return renderItem(info);
    }
  };

  render() {
    return (
      <VirtualizedList
        {...this.props}
        renderItem={this._renderItem}
        getItem={this._getItem}
        getItemCount={this._getItemCount}
        keyExtractor={this._keyExtractor}
        ref={this._captureRef}
        onViewableItemsChanged={this.props.onViewableItemsChanged && this._onViewableItemsChanged}
      />
    );
  }
}

module.exports = applyNativeMethods(FlatList);
