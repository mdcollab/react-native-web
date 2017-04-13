var _getAccessibilityRole=require('../getAccessibilityRole');var _getAccessibilityRole2=_interopRequireDefault(_getAccessibilityRole);
var _StyleSheet=require('../../apis/StyleSheet');var _StyleSheet2=_interopRequireDefault(_StyleSheet);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}

var emptyObject={};

var pointerEventStyles=_StyleSheet2.default.create({
auto:{
pointerEvents:'auto'},

'box-none':{
pointerEvents:'box-none'},

'box-only':{
pointerEvents:'box-only'},

none:{
pointerEvents:'none'}});



var createDOMProps=function createDOMProps(rnProps,resolveStyle){var _ref=














rnProps||emptyObject,accessibilityLabel=_ref.accessibilityLabel,accessibilityLiveRegion=_ref.accessibilityLiveRegion,_ref$accessible=_ref.accessible,accessible=_ref$accessible===undefined?true:_ref$accessible,pointerEvents=_ref.pointerEvents,rnStyle=_ref.style,testID=_ref.testID,type=_ref.type,accessibilityComponentType=_ref.accessibilityComponentType,accessibilityRole=_ref.accessibilityRole,accessibilityTraits=_ref.accessibilityTraits,domProps=_objectWithoutProperties(_ref,['accessibilityLabel','accessibilityLiveRegion','accessible','pointerEvents','style','testID','type','accessibilityComponentType','accessibilityRole','accessibilityTraits']);

var pointerEventStyle=pointerEvents&&pointerEventStyles[pointerEvents];var _ref2=
resolveStyle([rnStyle,pointerEventStyle])||emptyObject,className=_ref2.className,style=_ref2.style;
var role=(0,_getAccessibilityRole2.default)(rnProps||emptyObject);

if(!accessible){
domProps['aria-hidden']=true;
}
if(accessibilityLabel){
domProps['aria-label']=accessibilityLabel;
}
if(typeof accessibilityLiveRegion==='string'){
domProps['aria-live']=accessibilityLiveRegion==='none'?'off':accessibilityLiveRegion;
}
if(className&&className!==''){
domProps.className=domProps.className?domProps.className+' '+className:className;
}
if(role){
domProps.role=role;
if(role==='button'){
domProps.type='button';
}else if(role==='link'&&domProps.target==='_blank'){
domProps.rel=(domProps.rel||'')+' noopener noreferrer';
}
}
if(style){
domProps.style=style;
}
if(testID){
domProps['data-testid']=testID;
}
if(type){
domProps.type=type;
}

return domProps;
};

module.exports=createDOMProps;