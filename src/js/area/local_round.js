/**
 * Created by jjjj on 2016/1/25.
 */
var myPullScroll = null;
var url = '';
var type = '';
var tem = '';
function init() {
  //计算滚动区高度
  $('div[class="screen-result"]').height($(window).height() - $('.top').height() - $('.nav-ul').height());

  $(".nav-ul li").click(function () {
    if ($(this).attr("data-type") == "spot") {
      $(".item").hide();
      $(".spot").show();
      type = 'spot';
      tem = 'template1';
      url = "../testdata/area/spot_search/spot_search.js";
    }
    if ($(this).attr("data-type") == "hotel") {
      $(".item").hide();
      $(".hotel").show();
      type = 'hotel';
      tem = 'template2';
      url = "../testdata/area/hotel-search/hotel-search.js";
    }
    if ($(this).attr("data-type") == "route") {
      $(".item").hide();
      $(".route").show();
      type = 'route';
      tem = 'template3';
      url = "../testdata/area/line_search/line_search.js";
    }
    if ($(this).attr("data-type") == "guide") {
      $(".item").hide();
      $(".guide").show();
      type = 'guide';
      tem = 'template4';
      url = "../testdata/area/guide_search/guide_search.js";
    }
    update(true);
  });

  listCommon();
}
//覆盖search_common.js中的update方法
function update(isRefresh) {
  console.log(url);
  setTimeout(function () {
    //加载或者刷新数据
    $.getJSON(url, function (data, status) {
      if (status == "success") {
        console.log("success")
        var swiper_banner = new Swiper('.top .swiper-container', {
          pagination: '.top .swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
          loop: true
        });
        if (isRefresh) {
          myPullScroll.scrollToTop();
          $pullDown.html("下拉刷新");
          console.log("html")
          $("." + type).html(template(tem, data));
        } else {
          $pullUp.html("上拉加载更多");
          console.log("append")

          $("." + type).append(template(tem, data));
        }
        myPullScroll.refresh();
      }
      else {
        alert("loading error...");
      }
    });
  }, 500);
}
function detail(target) {
  var url = null;
  //var url = $(target).attr("data-url");
  var type = $(target).attr("data-type");
  switch (type) {
    case "line":
      url = "line_detail.html";
      break;
    case "hotel":
      url = "hotel_detail.html";
      break;
    case "spot":
      url = "spot_detail.html";
      break;
  }
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
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