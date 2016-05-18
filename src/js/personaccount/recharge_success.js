/**
 * Created by hyy
 * on 2016/4/2 0002.
 */
function  init(){
    FastClick.attach(document.body);
    loadData();

    $("#btnBack").click(function(){
        backAccount();
    });
}
var loadData = function() {
    var money = OperationURL.getQueryString("money");
    $("#labMoney").text(money);
};

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