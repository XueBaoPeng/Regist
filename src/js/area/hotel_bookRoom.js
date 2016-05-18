/**
 * Created by wangshouyun on 2016/1/11.
 */

var scroller = null;

//覆盖initialize.js中的init方法
function init() {

    $(".wrapper").height($(window).height() - $(".bottom").height());

    scroller = new ZHJIscroll(".wrapper");
}

function detailClick(target) {
    var url = $(target).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    console.log(new_url);
    var title="支付";
    loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}

function loadURL(winType, mode, orientation, title, url) {
    if (browseInfo.isTongLianApp()) {
        webviewInterface.createWindow(winType, mode, orientation, title, encodeURI(url));
    }
    else {
        window.location.href = url;
    }
}
