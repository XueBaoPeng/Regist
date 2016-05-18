/**
 * Created by hyy
 * on 2016/4/2 0002.
 */
function  init()
{
    FastClick.attach(document.body);

    $("#btnRecharge").click(function(){
        recharge();
    });

    $("#btnBack").click(function(){
        backAccount();
    });
}

function recharge(){
    var title = "充值";
    var url = "recharge.html";
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}

function backAccount(){
    //var title = $(obj).attr("data-title");
    //var url = $(obj).attr("data-url");
    //var new_url = OperationURL.getUrlParent(window.location.href) + url;
    //webviewInterface.backToAccount();
    if(browseInfo.isTongLianApp()&&happytoios){
        happytoios.execute('{"action":"backToAccount","params":"{}"}');
    }else{

    }
}