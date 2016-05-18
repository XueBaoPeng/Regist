/**
 * Created by zhj on 2016/2/18.
 */
//覆盖initialize.js中的init方法
var myPullScroll = null;
function init() {
  //计算滚动区高度
  $('div[class="screen-result"]').height($(window).height());
  listCommon();

  update();
}
//覆盖search_common.js中的update方法
function update(isRefresh) {
  setTimeout(function () {
    //加载或者刷新数据
    $.getJSON("../testdata/area/guide-order-totalOrder/guide-order-totalOrder.js", function (data, status) {
      if (status == "success") {
        //console.log("loading...");
        if (isRefresh) {
          myPullScroll.scrollToTop();
          $pullDown.html("下拉刷新");
          $(".totalMain").html(template("template", data));
        } else {
          $pullUp.html("上拉加载更多");
          $(".totalMain").append(template("template", data));
        }
        myPullScroll.refresh();
      }
      else {
        alert("loading error...");
      }
    });0
  }, 500);

}
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