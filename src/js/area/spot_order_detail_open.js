/**
 * Created by jjjj on 2016/1/25.
 */
function init() {
  //加载或者刷新数据
  $.getJSON("../testdata/area/spot-order-detail-open/spot-order-detail-open.js", function (data, status) {
    if (status == "success") {
      $(".spotMain").html(template("template", data));
    }
    else {
      alert("loading error...");
    }
  });
}
function detailClick(target) {
  var url = $(target).attr("data-url") + $(target).attr("data-id");
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
  console.log(new_url);
  loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, "null", new_url);
}
function loadURL(winType, mode, orientation, title, url) {
  if (browseInfo.isTongLianApp()) {
    webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
  }
  else {
    window.location.href = url;
  }
}
