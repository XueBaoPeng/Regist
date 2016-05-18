/**
 * Created by wangshouyun on 2016/1/11.
 */

//覆盖initialize.js中的init方法
var myPullScroll = null;
function init(){
    //计算滚动区高度
    $('div[class="screen-result"]').height($(window).height() - $('.date').height());
    listCommon();
}

//覆盖search_common.js中的update方法
function update(isRefresh){
    setTimeout(function(){
        //加载或者刷新数据
        $.getJSON("../testdata/area/hotel_detail/hotel_detail.js", function(data, status){
            if(status == "success"){
                if(isRefresh){
                    myPullScroll.scrollToTop();
                    //$pullDown.html("下拉刷新");
                    $(".result-ul").html(template("template", data));
                } else {
                    //$pullUp.html("上拉加载更多");
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
function detail(target){
    var url = $(target).attr("data-url");
    var title = "酒店详情";
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    console.log(new_url);
    loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
function detailClick(target){
    var url = $(target).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    console.log(new_url);
    var title = "预订酒店";
    loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//function loadURL(winType, mode, orientation, title, url){
//    if(browseInfo.isTongLianApp()){
//        webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
//    }
//    else {
//        window.location.href = url;
//    }
//}

