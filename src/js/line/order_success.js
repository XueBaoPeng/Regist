/**
 * Created by hyy on 2016/4/16 0016.
 */


function detailClick() {
    var id = OperationURL.getQueryString("id");
    var title="订单详情";
    var url = "../personcenter/line_order_detail.html?"+"id="+id;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect, webviewInterface.mode.push,webviewInterface.orientation.portrait, title,url);
}