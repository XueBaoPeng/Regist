/**
 * Created by zeke on 2016/3/21.
 */
function init(){
    //TODO 初始化
    var data = {
        name:""
    };
    getHotList(data,false, function(result){
        if(result.code==0){
            $("#recommend").html(template("template", result));
        }
    });

    $("#recommend li").click(function(){
       $(this).addClass("hot-active").siblings().removeClass("hot-active");
    });
};

var search = function(val){
    var new_url = OperationURL.getUrlParent(window.location.href) + "search_key.html?name="+val;
    OperationURL.loadURL(webviewInterface.winType.localPlay, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};