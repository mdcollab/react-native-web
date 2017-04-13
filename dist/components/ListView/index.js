var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _applyNativeMethods=require('../../modules/applyNativeMethods');var _applyNativeMethods2=_interopRequireDefault(_applyNativeMethods);
var _ListViewDataSource=require('./ListViewDataSource');var _ListViewDataSource2=_interopRequireDefault(_ListViewDataSource);
var _ListViewPropTypes=require('./ListViewPropTypes');var _ListViewPropTypes2=_interopRequireDefault(_ListViewPropTypes);
var _ScrollView=require('../ScrollView');var _ScrollView2=_interopRequireDefault(_ScrollView);
var _StaticRenderer=require('../StaticRenderer');var _StaticRenderer2=_interopRequireDefault(_StaticRenderer);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _isEmpty=require('fbjs/lib/isEmpty');var _isEmpty2=_interopRequireDefault(_isEmpty);
var _requestAnimationFrame=require('fbjs/lib/requestAnimationFrame');var _requestAnimationFrame2=_interopRequireDefault(_requestAnimationFrame);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var DEFAULT_PAGE_SIZE=1;
var DEFAULT_INITIAL_ROWS=10;
var DEFAULT_SCROLL_RENDER_AHEAD=1000;
var DEFAULT_END_REACHED_THRESHOLD=1000;
var DEFAULT_SCROLL_CALLBACK_THROTTLE=50;var

ListView=function(_Component){_inherits(ListView,_Component);















function ListView(props){_classCallCheck(this,ListView);var _this=_possibleConstructorReturn(this,(ListView.__proto__||Object.getPrototypeOf(ListView)).call(this,
props));_initialiseProps.call(_this);
_this.state={
curRenderedRowsCount:_this.props.initialListSize,
highlightedRow:{}};

_this.onRowHighlighted=function(sectionId,rowId){return _this._onRowHighlighted(sectionId,rowId);};
_this.scrollProperties={};return _this;
}_createClass(ListView,[{key:'componentWillMount',value:function componentWillMount()

{

this.scrollProperties={
visibleLength:null,
contentLength:null,
offset:0};

this._childFrames=[];
this._visibleRows={};
this._prevRenderedRowsCount=0;
this._sentEndForContentLength=null;
}},{key:'componentDidMount',value:function componentDidMount()

{var _this2=this;


(0,_requestAnimationFrame2.default)(function(){
_this2._measureAndUpdateScrollProps();
});
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){var _this3=this;
if(
this.props.dataSource!==nextProps.dataSource||
this.props.initialListSize!==nextProps.initialListSize)
{
this.setState(
function(state,props){
_this3._prevRenderedRowsCount=0;
return{
curRenderedRowsCount:Math.min(
Math.max(state.curRenderedRowsCount,props.initialListSize),
props.enableEmptySections?
props.dataSource.getRowAndSectionCount():
props.dataSource.getRowCount())};


},
function(){return _this3._renderMoreRowsIfNeeded();});

}
}},{key:'componentDidUpdate',value:function componentDidUpdate()

{var _this4=this;
(0,_requestAnimationFrame2.default)(function(){
_this4._measureAndUpdateScrollProps();
});
}},{key:'getScrollResponder',value:function getScrollResponder()

{
return this._scrollViewRef&&this._scrollViewRef.getScrollResponder();
}},{key:'scrollTo',value:function scrollTo()

{var _scrollViewRef;
return this._scrollViewRef&&(_scrollViewRef=this._scrollViewRef).scrollTo.apply(_scrollViewRef,arguments);
}},{key:'setNativeProps',value:function setNativeProps(

props){
return this._scrollViewRef&&this._scrollViewRef.setNativeProps(props);
}},{key:'render',value:function render()













{
var children=[];var _props=
























this.props,dataSource=_props.dataSource,enableEmptySections=_props.enableEmptySections,renderFooter=_props.renderFooter,renderHeader=_props.renderHeader,renderScrollComponent=_props.renderScrollComponent,renderSectionHeader=_props.renderSectionHeader,renderSeparator=_props.renderSeparator,initialListSize=_props.initialListSize,onChangeVisibleRows=_props.onChangeVisibleRows,onEndReached=_props.onEndReached,onEndReachedThreshold=_props.onEndReachedThreshold,onKeyboardDidHide=_props.onKeyboardDidHide,onKeyboardDidShow=_props.onKeyboardDidShow,onKeyboardWillHide=_props.onKeyboardWillHide,onKeyboardWillShow=_props.onKeyboardWillShow,pageSize=_props.pageSize,renderRow=_props.renderRow,scrollRenderAheadDistance=_props.scrollRenderAheadDistance,stickyHeaderIndices=_props.stickyHeaderIndices,scrollProps=_objectWithoutProperties(_props,['dataSource','enableEmptySections','renderFooter','renderHeader','renderScrollComponent','renderSectionHeader','renderSeparator','initialListSize','onChangeVisibleRows','onEndReached','onEndReachedThreshold','onKeyboardDidHide','onKeyboardDidShow','onKeyboardWillHide','onKeyboardWillShow','pageSize','renderRow','scrollRenderAheadDistance','stickyHeaderIndices']);

var allRowIDs=dataSource.rowIdentities;
var rowCount=0;
var sectionHeaderIndices=[];

var header=renderHeader&&renderHeader();
var footer=renderFooter&&renderFooter();
var totalIndex=header?1:0;

for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var sectionID=dataSource.sectionIdentities[sectionIdx];
var rowIDs=allRowIDs[sectionIdx];
if(rowIDs.length===0){
if(enableEmptySections===undefined){
var warning=require('fbjs/lib/warning');
warning(
false,
'In next release empty section headers will be rendered.'+
" In this release you can use 'enableEmptySections' flag to render empty section headers.");

continue;
}else{
var invariant=require('fbjs/lib/invariant');
invariant(
enableEmptySections,
"In next release 'enableEmptySections' flag will be deprecated,"+
' empty section headers will always be rendered. If empty section headers'+
' are not desirable their indices should be excluded from sectionIDs object.'+
" In this release 'enableEmptySections' may only have value 'true'"+
' to allow empty section headers rendering.');

}
}

if(renderSectionHeader){
var shouldUpdateHeader=rowCount>=this._prevRenderedRowsCount&&
dataSource.sectionHeaderShouldUpdate(sectionIdx);
children.push(
_react2.default.createElement(_StaticRenderer2.default,{
key:'s_'+sectionID,
render:this.renderSectionHeaderFn(
dataSource.getSectionHeaderData(sectionIdx),
sectionID),

shouldUpdate:!!shouldUpdateHeader}));


sectionHeaderIndices.push(totalIndex++);
}

for(var rowIdx=0;rowIdx<rowIDs.length;rowIdx++){
var rowID=rowIDs[rowIdx];
var comboID=sectionID+'_'+rowID;
var shouldUpdateRow=rowCount>=this._prevRenderedRowsCount&&
dataSource.rowShouldUpdate(sectionIdx,rowIdx);
var row=
_react2.default.createElement(_StaticRenderer2.default,{
key:'r_'+comboID,
render:this.renderRowFn(dataSource.getRowData(sectionIdx,rowIdx),sectionID,rowID),
shouldUpdate:!!shouldUpdateRow});


children.push(row);
totalIndex++;

if(
renderSeparator&&(rowIdx!==rowIDs.length-1||sectionIdx===allRowIDs.length-1))
{
var adjacentRowHighlighted=this.state.highlightedRow.sectionID===sectionID&&(
this.state.highlightedRow.rowID===rowID||
this.state.highlightedRow.rowID===rowIDs[rowIdx+1]);
var separator=renderSeparator(sectionID,rowID,adjacentRowHighlighted);
if(separator){
children.push(separator);
totalIndex++;
}
}
if(++rowCount===this.state.curRenderedRowsCount){
break;
}
}
if(rowCount>=this.state.curRenderedRowsCount){
break;
}
}
scrollProps.onScroll=this._onScroll;

return _react2.default.cloneElement(
renderScrollComponent(scrollProps),
{
ref:this._setScrollViewRef,
onContentSizeChange:this._onContentSizeChange,
onLayout:this._onLayout},

header,
children,
footer);

}},{key:'_measureAndUpdateScrollProps',value:function _measureAndUpdateScrollProps()

{
var scrollComponent=this.getScrollResponder();
if(!scrollComponent||!scrollComponent.getInnerViewNode){
return;
}

this._updateVisibleRows();
}},{key:'_updateVisibleRows',value:function _updateVisibleRows(












updatedFrames){var _this5=this;
if(!this.props.onChangeVisibleRows){
return;
}
if(updatedFrames){
updatedFrames.forEach(function(newFrame){
_this5._childFrames[newFrame.index]=_extends({},newFrame);
});
}
var isVertical=!this.props.horizontal;
var dataSource=this.props.dataSource;
var visibleMin=this.scrollProperties.offset;
var visibleMax=visibleMin+this.scrollProperties.visibleLength;
var allRowIDs=dataSource.rowIdentities;

var header=this.props.renderHeader&&this.props.renderHeader();
var totalIndex=header?1:0;
var visibilityChanged=false;
var changedRows={};
for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var rowIDs=allRowIDs[sectionIdx];
if(rowIDs.length===0){
continue;
}
var sectionID=dataSource.sectionIdentities[sectionIdx];
if(this.props.renderSectionHeader){
totalIndex++;
}
var visibleSection=this._visibleRows[sectionID];
if(!visibleSection){
visibleSection={};
}
for(var rowIdx=0;rowIdx<rowIDs.length;rowIdx++){
var rowID=rowIDs[rowIdx];
var frame=this._childFrames[totalIndex];
totalIndex++;
if(
this.props.renderSeparator&&(
rowIdx!==rowIDs.length-1||sectionIdx===allRowIDs.length-1))
{
totalIndex++;
}
if(!frame){
break;
}
var rowVisible=visibleSection[rowID];
var min=isVertical?frame.y:frame.x;
var max=min+(isVertical?frame.height:frame.width);
if(!min&&!max||min===max){
break;
}
if(min>visibleMax||max<visibleMin){
if(rowVisible){
visibilityChanged=true;
delete visibleSection[rowID];
if(!changedRows[sectionID]){
changedRows[sectionID]={};
}
changedRows[sectionID][rowID]=false;
}
}else if(!rowVisible){
visibilityChanged=true;
visibleSection[rowID]=true;
if(!changedRows[sectionID]){
changedRows[sectionID]={};
}
changedRows[sectionID][rowID]=true;
}
}
if(!(0,_isEmpty2.default)(visibleSection)){
this._visibleRows[sectionID]=visibleSection;
}else if(this._visibleRows[sectionID]){
delete this._visibleRows[sectionID];
}
}
visibilityChanged&&this.props.onChangeVisibleRows(this._visibleRows,changedRows);
}},{key:'_getDistanceFromEnd',value:function _getDistanceFromEnd(











scrollProperties){
return scrollProperties.contentLength-
scrollProperties.visibleLength-
scrollProperties.offset;
}},{key:'_maybeCallOnEndReached',value:function _maybeCallOnEndReached(

event){
if(
this.props.onEndReached&&
this.scrollProperties.contentLength!==this._sentEndForContentLength&&
this._getDistanceFromEnd(this.scrollProperties)<this.props.onEndReachedThreshold&&
this.state.curRenderedRowsCount===(
this.props.enableEmptySections?
this.props.dataSource.getRowAndSectionCount():
this.props.dataSource.getRowCount()))
{
this._sentEndForContentLength=this.scrollProperties.contentLength;
this.props.onEndReached(event);
return true;
}
return false;
}},{key:'_renderMoreRowsIfNeeded',value:function _renderMoreRowsIfNeeded()

{
if(
this.scrollProperties.contentLength===null||
this.scrollProperties.visibleLength===null||
this.state.curRenderedRowsCount===(
this.props.enableEmptySections?
this.props.dataSource.getRowAndSectionCount():
this.props.dataSource.getRowCount()))
{
this._maybeCallOnEndReached();
return;
}

var distanceFromEnd=this._getDistanceFromEnd(this.scrollProperties);
if(distanceFromEnd<this.props.scrollRenderAheadDistance){
this._pageInNewRows();
}
}},{key:'_pageInNewRows',value:function _pageInNewRows()

{var _this6=this;
this.setState(
function(state,props){
var rowsToRender=Math.min(
state.curRenderedRowsCount+props.pageSize,
props.enableEmptySections?
props.dataSource.getRowAndSectionCount():
props.dataSource.getRowCount());

_this6._prevRenderedRowsCount=state.curRenderedRowsCount;
return{
curRenderedRowsCount:rowsToRender};

},
function(){
_this6._measureAndUpdateScrollProps();
_this6._prevRenderedRowsCount=_this6.state.curRenderedRowsCount;
});

}}]);return ListView;}(_react.Component);ListView.defaultProps={initialListSize:DEFAULT_INITIAL_ROWS,pageSize:DEFAULT_PAGE_SIZE,renderScrollComponent:function renderScrollComponent(props){return _react2.default.createElement(_ScrollView2.default,props);},scrollRenderAheadDistance:DEFAULT_SCROLL_RENDER_AHEAD,onEndReachedThreshold:DEFAULT_END_REACHED_THRESHOLD,scrollEventThrottle:DEFAULT_SCROLL_CALLBACK_THROTTLE,removeClippedSubviews:true,stickyHeaderIndices:[]};ListView.DataSource=_ListViewDataSource2.default;var _initialiseProps=function _initialiseProps(){var _this7=this;this._onRowHighlighted=function(sectionId,rowId){_this7.setState({highlightedRow:{sectionId:sectionId,rowId:rowId}});};this.renderSectionHeaderFn=function(data,sectionID){return function(){return _this7.props.renderSectionHeader(data,sectionID);};};this.renderRowFn=function(data,sectionID,rowID){return function(){return _this7.props.renderRow(data,sectionID,rowID,_this7._onRowHighlighted);};};this._onLayout=function(event){var _event$nativeEvent$la=event.nativeEvent.layout,width=_event$nativeEvent$la.width,height=_event$nativeEvent$la.height;var visibleLength=!_this7.props.horizontal?height:width;if(visibleLength!==_this7.scrollProperties.visibleLength){_this7.scrollProperties.visibleLength=visibleLength;_this7._updateVisibleRows();_this7._renderMoreRowsIfNeeded();}_this7.props.onLayout&&_this7.props.onLayout(event);};this._onContentSizeChange=function(width,height){var contentLength=!_this7.props.horizontal?height:width;if(contentLength!==_this7.scrollProperties.contentLength){_this7.scrollProperties.contentLength=contentLength;_this7._updateVisibleRows();_this7._renderMoreRowsIfNeeded();}_this7.props.onContentSizeChange&&_this7.props.onContentSizeChange(width,height);};this.

_onScroll=function(e){
var isVertical=!_this7.props.horizontal;
_this7.scrollProperties.visibleLength=e.nativeEvent.layoutMeasurement[
isVertical?'height':'width'];

_this7.scrollProperties.contentLength=e.nativeEvent.contentSize[
isVertical?'height':'width'];

_this7.scrollProperties.offset=e.nativeEvent.contentOffset[isVertical?'y':'x'];
_this7._updateVisibleRows(e.nativeEvent.updatedChildFrames);
if(!_this7._maybeCallOnEndReached(e)){
_this7._renderMoreRowsIfNeeded();
}

if(
_this7.props.onEndReached&&
_this7._getDistanceFromEnd(_this7.scrollProperties)>_this7.props.onEndReachedThreshold)
{

_this7._sentEndForContentLength=null;
}

_this7.props.onScroll&&_this7.props.onScroll(e);
};this.

_setScrollViewRef=function(component){
_this7._scrollViewRef=component;
};};process.env.NODE_ENV!=="production"?ListView.propTypes=_ListViewPropTypes2.default:void 0;


module.exports=(0,_applyNativeMethods2.default)(ListView);