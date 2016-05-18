/**
 * Created by hyy on 2016/4/7 0007.
 */
function  init()
{
    loadData();
    FastClick.attach(document.body);
    webviewInterface.localStorage("getCity",webviewInterface.keyType.cityName,null);
}
var loadData = function() {
    var id = OperationURL.getQueryString("id");
    var data = {
            id:id
    };
    getTravelClassify(data, true, function (result) {
        $("#roomList").html(template("tmplRoomList", result));

        console.log(result)
        var height=$(".content").height()-2*$(".content li").height()-40;
        $(".line").height(height);
    });
};
function ifyClick(obj) {
    var title = "分类路线";
    var url = $(obj).attr("data-url");
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect,webviewInterface.mode.push,webviewInterface.orientation.portrait,title, new_url);
}
