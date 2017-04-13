var _propTypes=require('prop-types');
var numberOrString=(0,_propTypes.oneOfType)([_propTypes.number,_propTypes.string]);

var LayoutPropTypes={

borderWidth:numberOrString,
borderBottomWidth:numberOrString,
borderLeftWidth:numberOrString,
borderRightWidth:numberOrString,
borderTopWidth:numberOrString,
boxSizing:_propTypes.string,
display:_propTypes.string,
height:numberOrString,
margin:numberOrString,
marginBottom:numberOrString,
marginHorizontal:numberOrString,
marginLeft:numberOrString,
marginRight:numberOrString,
marginTop:numberOrString,
marginVertical:numberOrString,
maxHeight:numberOrString,
maxWidth:numberOrString,
minHeight:numberOrString,
minWidth:numberOrString,
padding:numberOrString,
paddingBottom:numberOrString,
paddingHorizontal:numberOrString,
paddingLeft:numberOrString,
paddingRight:numberOrString,
paddingTop:numberOrString,
paddingVertical:numberOrString,
width:numberOrString,

alignContent:(0,_propTypes.oneOf)([
'center',
'flex-end',
'flex-start',
'space-around',
'space-between',
'stretch']),

alignItems:(0,_propTypes.oneOf)(['baseline','center','flex-end','flex-start','stretch']),
alignSelf:(0,_propTypes.oneOf)(['auto','baseline','center','flex-end','flex-start','stretch']),
flex:_propTypes.number,
flexBasis:numberOrString,
flexDirection:(0,_propTypes.oneOf)(['column','column-reverse','row','row-reverse']),
flexGrow:_propTypes.number,
flexShrink:_propTypes.number,
flexWrap:(0,_propTypes.oneOf)(['nowrap','wrap','wrap-reverse']),
justifyContent:(0,_propTypes.oneOf)(['center','flex-end','flex-start','space-around','space-between']),
order:_propTypes.number,

bottom:numberOrString,
left:numberOrString,
position:(0,_propTypes.oneOf)(['absolute','fixed','relative','static']),
right:numberOrString,
top:numberOrString};


module.exports=LayoutPropTypes;