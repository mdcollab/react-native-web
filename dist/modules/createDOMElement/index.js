require('../injectResponderEventPlugin');

var _createDOMProps=require('../createDOMProps');var _createDOMProps2=_interopRequireDefault(_createDOMProps);
var _getAccessibilityRole=require('../getAccessibilityRole');var _getAccessibilityRole2=_interopRequireDefault(_getAccessibilityRole);
var _normalizeNativeEvent=require('../normalizeNativeEvent');var _normalizeNativeEvent2=_interopRequireDefault(_normalizeNativeEvent);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _registry=require('../../apis/StyleSheet/registry');var _registry2=_interopRequireDefault(_registry);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var emptyObject={};

var roleComponents={
article:'article',
banner:'header',
button:'button',
complementary:'aside',
contentinfo:'footer',
form:'form',
link:'a',
list:'ul',
listitem:'li',
main:'main',
navigation:'nav',
region:'section'};


var eventHandlerNames={
onClick:true,
onClickCapture:true,
onMoveShouldSetResponder:true,
onMoveShouldSetResponderCapture:true,
onResponderGrant:true,
onResponderMove:true,
onResponderReject:true,
onResponderRelease:true,
onResponderTerminate:true,
onResponderTerminationRequest:true,
onStartShouldSetResponder:true,
onStartShouldSetResponderCapture:true,
onTouchCancel:true,
onTouchCancelCapture:true,
onTouchEnd:true,
onTouchEndCapture:true,
onTouchMove:true,
onTouchMoveCapture:true,
onTouchStart:true,
onTouchStartCapture:true};


var wrapEventHandler=function wrapEventHandler(handler){return function(e){
e.nativeEvent=(0,_normalizeNativeEvent2.default)(e.nativeEvent);
return handler(e);
};};

var getAccessibilityComponent=function getAccessibilityComponent(){var props=arguments.length>0&&arguments[0]!==undefined?arguments[0]:emptyObject;
var role=(0,_getAccessibilityRole2.default)(props);
if(role==='heading'){
var level=props['aria-level']||1;
return'h'+level;
}
return roleComponents[role];
};

var createDOMElement=function createDOMElement(component,rnProps){

var accessibilityComponent=getAccessibilityComponent(rnProps);
var Component=accessibilityComponent||component;

var domProps=(0,_createDOMProps2.default)(rnProps,function(style){return _registry2.default.resolve(style);});



for(var prop in domProps){
if(Object.prototype.hasOwnProperty.call(domProps,prop)){
var isEventHandler=typeof prop==='function'&&eventHandlerNames[prop];
if(isEventHandler){
domProps[prop]=wrapEventHandler(prop);
}
}
}

return _react2.default.createElement(Component,domProps);
};

module.exports=createDOMElement;