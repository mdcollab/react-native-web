var getAccessibilityRole=function getAccessibilityRole(_ref)





{var accessibilityComponentType=_ref.accessibilityComponentType,accessibilityRole=_ref.accessibilityRole,accessibilityTraits=_ref.accessibilityTraits;
if(accessibilityRole){
return accessibilityRole;
}else if(accessibilityComponentType==='button'||accessibilityTraits==='button'){
return'button';
}
};

module.exports=getAccessibilityRole;