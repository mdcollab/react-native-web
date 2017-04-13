var _I18nManager=require('../I18nManager');var _I18nManager2=_interopRequireDefault(_I18nManager);
var _multiplyStyleLengthValue=require('../../modules/multiplyStyleLengthValue');var _multiplyStyleLengthValue2=_interopRequireDefault(_multiplyStyleLengthValue);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var emptyObject={};




var PROPERTIES_TO_SWAP={
borderTopLeftRadius:'borderTopRightRadius',
borderTopRightRadius:'borderTopLeftRadius',
borderBottomLeftRadius:'borderBottomRightRadius',
borderBottomRightRadius:'borderBottomLeftRadius',
borderLeftColor:'borderRightColor',
borderLeftStyle:'borderRightStyle',
borderLeftWidth:'borderRightWidth',
borderRightColor:'borderLeftColor',
borderRightWidth:'borderLeftWidth',
borderRightStyle:'borderLeftStyle',
left:'right',
marginLeft:'marginRight',
marginRight:'marginLeft',
paddingLeft:'paddingRight',
paddingRight:'paddingLeft',
right:'left'};


var PROPERTIES_SWAP_LEFT_RIGHT={
clear:true,
float:true,
textAlign:true};





var additiveInverse=function additiveInverse(value){return(0,_multiplyStyleLengthValue2.default)(value,-1);};




var flipProperty=function flipProperty(prop){
return PROPERTIES_TO_SWAP.hasOwnProperty(prop)?PROPERTIES_TO_SWAP[prop]:prop;
};




var flipTransform=function flipTransform(transform){
var translateX=transform.translateX;
if(translateX!=null){
transform.translateX=additiveInverse(translateX);
}
return transform;
};

var swapLeftRight=function swapLeftRight(value){
return value==='left'?'right':value==='right'?'left':value;
};

var i18nStyle=function i18nStyle(originalStyle){
if(!_I18nManager2.default.isRTL){
return originalStyle;
}

var style=originalStyle||emptyObject;
var nextStyle={};

for(var prop in style){
if(!Object.prototype.hasOwnProperty.call(style,prop)){
continue;
}

if(PROPERTIES_TO_SWAP[prop]){
var newProp=flipProperty(prop);
nextStyle[newProp]=style[prop];
}else if(PROPERTIES_SWAP_LEFT_RIGHT[prop]){
nextStyle[prop]=swapLeftRight(style[prop]);
}else if(prop==='textShadowOffset'){
nextStyle[prop]=style[prop];
nextStyle[prop].width=additiveInverse(style[prop].width);
}else if(prop==='transform'){
nextStyle[prop]=style[prop].map(flipTransform);
}else{
nextStyle[prop]=style[prop];
}
}

return nextStyle;
};

module.exports=i18nStyle;