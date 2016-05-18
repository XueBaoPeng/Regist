/**
 * Created by jjjj on 2016/2/23.
 */
function init(){

}
var detailClick = function(obj){
    var title = "常用旅客信息";
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};
