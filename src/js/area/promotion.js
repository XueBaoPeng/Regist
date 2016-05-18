/**
 * Created by jjjj on 2016/1/25.
 */

//覆盖initialize.js中的init方法

var myPullScroll = null;

function init() {
  //计算滚动区高度
  $('div[class="screen-result"]').height($(window).height() - $('.top').height()-$('.nav-ul').height());
  listCommon()
}
//覆盖search_common.js中的update方法
function update(isRefresh) {
  setTimeout(function () {
    //加载或者刷新数据
    $.getJSON("../testdata/area/index/index-data.js", function (data, status) {
      if (status == "success") {
        var swiper_banner = new Swiper('.top .swiper-container', {
          pagination: '.top .swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
          loop: true
        });
        //console.log("loading...");

        if (isRefresh) {
          myPullScroll.scrollToTop();
          $pullDown.html("下拉刷新");
          $(".result-ul").html(template("template", data));
        } else {
          $pullUp.html("上拉加载更多");
          $(".result-ul").append(template("template", data));
        }
        myPullScroll.refresh();
      }
      else {
        alert("loading error...");
      }
    });
  }, 500);

}
function promotionClick(target) {
  var url = null;
  var type = $(target).attr("data-type");
  switch (type){
    case "line":
      url = "line_detail.html";
      break;case "hotel":
    url = "hotel_detail.html";
    break;
    case "spot":
      url = "spot_detail.html";
      break;
  }
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
  loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, "产品详情", new_url);
}

function loadURL(winType, mode, orientation, title, url) {
  if (browseInfo.isTongLianApp()) {
    webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
  }
  else {
    window.location.href = url;
  }
}