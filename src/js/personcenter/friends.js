function init(){
    var id = OperationURL.getQueryString("id");
    var param = {
        id : id
    };
    getMyFriends(param, false, function(result){
        if(result.code == 0){
            $("#container").html(template("tempFriend", result));
        }
    });
}
var friendsClick = function(){
    var id = OperationURL.getQueryString("id");
    var title = "兔友列表";
    var url = "friend_list.html?id="+id;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var qrCodeClick = function(){
    var id = OperationURL.getQueryString("id");
    var title = "二维码";
    var url = "recommond.html?id="+id;
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};