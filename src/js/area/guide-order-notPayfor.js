/**
 * Created by jjjj on 2016/1/25.
 */
var myPullScroll = null;
var querywithorder = new QueryWithOrder();
function init() {
  //计算滚动区高度
  $('div[class="screen-result"]').height($(window).height()-$(".button").height()-20);
  listCommon();
  update(true);
}
//覆盖search_common.js中的update方法
function update(isRefresh) {
  setTimeout(function () {
    //加载或者刷新数据
    $.getJSON("../testdata/area/guide-order-notPayfor/guide-order-notPayfor.js", function (data, status) {
      if (status == "success") {
        myPullScroll.scrollToTop();
        $pullDown.html("下拉刷新");
        $(".orderDetail").html(template("template", data));
        myPullScroll.refresh();
      }
      else {
        alert("loading error...");
      }
    });
  }, 500);
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
