var _ColorPropType=require('./ColorPropType');var _ColorPropType2=_interopRequireDefault(_ColorPropType);
var _propTypes=require('prop-types');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}
var numberOrString=(0,_propTypes.oneOfType)([_propTypes.number,_propTypes.string]);

var ShadowPropTypes={
shadowColor:_ColorPropType2.default,
shadowOffset:(0,_propTypes.shape)({
width:numberOrString,
height:numberOrString}),

shadowOpacity:_propTypes.number,
shadowRadius:numberOrString,
shadowSpread:numberOrString};


module.exports=ShadowPropTypes;