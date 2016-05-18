/**
 * Created by jjjj on 2016/1/28.
 */
//覆盖initialize.js中的init方法
function init() {

}

function detailClick(target) {
  var url = $(target).attr("data-url");
  var new_url = OperationURL.getUrlParent(window.location.href) + url;

  loadURL(new_url);
}
function loadURL(url) {
  console.log(browseInfo.isTongLianApp());
  if (browseInfo.isTongLianApp()) {
    webviewInterface.backToHome();
  }
  else {
    window.location.href = url;
  }
}