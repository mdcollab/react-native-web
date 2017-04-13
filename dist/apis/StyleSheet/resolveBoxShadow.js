var _normalizeValue=require('./normalizeValue');var _normalizeValue2=_interopRequireDefault(_normalizeValue);
var _processColor=require('../../modules/processColor');var _processColor2=_interopRequireDefault(_processColor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var defaultOffset={height:0,width:0};


var resolveBoxShadow=function resolveBoxShadow(resolvedStyle,style){var _ref=
style.shadowOffset||defaultOffset,height=_ref.height,width=_ref.width;
var offsetX=(0,_normalizeValue2.default)(null,width);
var offsetY=(0,_normalizeValue2.default)(null,height);
var blurRadius=(0,_normalizeValue2.default)(null,style.shadowRadius||0);
var color=(0,_processColor2.default)(style.shadowColor,style.shadowOpacity);

if(color){
var boxShadow=offsetX+' '+offsetY+' '+blurRadius+' '+color;
resolvedStyle.boxShadow=style.boxShadow?style.boxShadow+', '+boxShadow:boxShadow;
}else if(style.boxShadow){
resolvedStyle.boxShadow=style.boxShadow;
}
};

module.exports=resolveBoxShadow;