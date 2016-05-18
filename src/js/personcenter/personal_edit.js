/**
 * Created by zeke on 2016/4/16.
 */
function init(){

}

var saveNick = function(){
    //TODO 保存昵称
    var id = OperationURL.getQueryString("id");
    var nick = $("#txtNick").val();
    if(nick==""||nick.length<1){
        $.happytoAlert("请输入昵称");
        return;
    }
    var param = {
        id : id,
        userNick : nick
    };
    savePersonInfo(param, false, function(result){
        if(result.code == 0){
            webviewInterface.backToPerson();
        } else {
            $.happytoAlert(result.msg);
        }
    });
};