function remSize(){
//获取设备宽度
var deviceWidth=document.documentElement.clientWidth||window.innerWidth
if(deviceWidth>=750){
    deviceWidth=750
}
if(deviceWidth<=320){
    deviceWidth=320
}
document.documentElement.style.fontSize=(deviceWidth/7.5)+'px'
document.querySelector('body').style.fontSize=0.3+'rem'
}
remSize()
//当屏幕尺寸变化时调用
window.onresize=function(){
remSize()
}