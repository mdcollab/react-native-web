







var _createDOMProps=require('../createDOMProps');var _createDOMProps2=_interopRequireDefault(_createDOMProps);
var _findNodeHandle=require('../findNodeHandle');var _findNodeHandle2=_interopRequireDefault(_findNodeHandle);
var _registry=require('../../apis/StyleSheet/registry');var _registry2=_interopRequireDefault(_registry);
var _UIManager=require('../../apis/UIManager');var _UIManager2=_interopRequireDefault(_UIManager);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}

var NativeMethodsMixin={



blur:function blur(){
_UIManager2.default.blur((0,_findNodeHandle2.default)(this));
},





focus:function focus(){
_UIManager2.default.focus((0,_findNodeHandle2.default)(this));
},




measure:function measure(callback){
_UIManager2.default.measure((0,_findNodeHandle2.default)(this),callback);
},
















measureInWindow:function measureInWindow(callback){
_UIManager2.default.measureInWindow((0,_findNodeHandle2.default)(this),callback);
},




measureLayout:function measureLayout(relativeToNativeNode,onSuccess,onFail){
_UIManager2.default.measureLayout((0,_findNodeHandle2.default)(this),relativeToNativeNode,onFail,onSuccess);
},







setNativeProps:function setNativeProps(nativeProps){

var node=(0,_findNodeHandle2.default)(this);
var classList=[].concat(_toConsumableArray(node.classList));

var domProps=(0,_createDOMProps2.default)(nativeProps,function(style){return(
_registry2.default.resolveStateful(style,classList));});
_UIManager2.default.updateView(node,domProps,this);
}};


module.exports=NativeMethodsMixin;