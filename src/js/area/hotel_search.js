/**
 * Created by wangshouyun on 2016/1/11.
 */

//覆盖initialize.js中的init方法

var myPullScroll = null;
var querywithorder = new QueryWithOrder();
function init() {

    //计算滚动区高度
    $('div[class="screen-result"]').height($(window).height() - $('.navigation').height()-$('.date').height());
  $(".nav-ul li").click(function () {
    if ($(this).attr("data-type") == "filter") {
      return;
    }
    console.log($(this).attr("data-type")+"Order");
    querywithorder.changeOrderField($(this).attr("data-type")+"Order");
    if ($(this).hasClass("desc")) {//如果包含有这个CLASS，那么现在是降序，点击后要升序
      $(this).removeClass("desc");
      querywithorder.changeOrderDesc(false);

      update(true);
    } else {//不包含这个CLASS，现在是升序，点击后要降序
      querywithorder.changeOrderDesc(true);

      $(this).addClass("desc");
      update(true);
    }
  });

  listCommon()
}

function search(content){
  //TODO 搜索查询
  alert(content);
}

//覆盖search_common.js中的update方法
function update(isRefresh) {
  if (isRefresh) {
    querywithorder.refreshPage();//刷新页面
    setTimeout(function () {
      //加载或者刷新数据
      $.getJSON("../testdata/area/hotel-search/hotel-search.js", querywithorder.getQuerySting(), function (data, status) {
        if (status == "success") {
          myPullScroll.scrollToTop();
          $pullDown.html("下拉刷新");
          $(".result-ul").html(template("template", data));
          myPullScroll.refresh();
        }
        else {
          alert("loading error...");
        }
      });
    }, 500);
  }
  else {
    querywithorder.addPage();//加载下一页
    setTimeout(function () {
      //加载或者刷新数据
      $.getJSON("../testdata/area/hotel-search/hotel-search.js", querywithorder.getQuerySting(), function (data, status) {
        if (status == "success") {
          $pullUp.html("上拉加载更多");
          $(".result-ul").append(template("template", data));
          myPullScroll.refresh();
        }
        else {
          alert("loading error...");
        }
      });
    }, 500);
  }
}
function detail(target) {
  var url = $(target).attr("data-url") + $(target).attr("data-id");
  //var url = $(target).attr("data-url");
  var new_url = OperationURL.getUrlParent(window.location.href) + url;
  var title="房型列表";
  console.log(new_url);
  loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, title, new_url);
}
function loadURL(winType, mode, orientation, title, url) {
  if (browseInfo.isTongLianApp()) {
    webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
  }
  else {
    window.location.href = url;
  }
}