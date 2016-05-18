/**
 * Created by zeke on 2016/4/25.
 */
function init(){

}

var rechargeClick = function(){
    var title = "充值";
    var url = "buy_tubei.html";
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var accountClick = function(){
    webviewInterface.backToAccount();
};
