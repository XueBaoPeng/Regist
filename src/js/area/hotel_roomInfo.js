/**
 * Created by wangshouyun on 2016/1/11.
 */
var iscroller = null;
//覆盖initialize.js中的init方法
function init() {

    $(".wrapper").height($(window).height()-$(".bookBtn").height());

    iscroller = new ZHJIscroll(".wrapper");

}
$(document).ready(function(){ init(); });
function detailClick(target) {
  var url = $(target).attr("data-url");
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
  console.log(new_url);
  loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, "null", new_url);
}
function loadURL(winType, mode, orientation, title, url) {
  if (browseInfo.isTongLianApp()) {
    webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
  }
  else {
    window.location.href = url;
  }
}
