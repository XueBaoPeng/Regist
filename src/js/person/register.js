/**
 * Created by hyy on 2016/4/28 0028.
 */
function  init(){
    FastClick.attach(document.body);

}
/*点击发送验证码*/

//var sendValidate=function(obj){
//    var phone=$("#tel-num").val();
//    var data={
//        phone: phone,
//        password: "",
//        userId: 0,
//        userKey: ""
//}
//    xx(data, true, function (result) {
//        if(result.code==0) {
//        //if(){
//        //
//        //}else{
//       // $("#password-error").show();
//        // }
//        }
//    })
//};
function sendValidate(obj) {
    var title = "验证码";
    var url = "register_code.html";
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect,webviewInterface.mode.push,webviewInterface.orientation.portrait,title, new_url);
}


/*验证码点击下一步*/
function nextCode(obj) {
    var title = "";
    var url = "register_code.html";
    var new_url = OperationURL.getUrlParent(window.location.href) + url;
    OperationURL.loadURL(webviewInterface.winType.shareAndcollect,webviewInterface.mode.push,webviewInterface.orientation.portrait,title, new_url);
}
/*验证码倒计时*/
function run(){
    var s = document.getElementById("time");
    if(s.innerHTML == 0){
        $("#new-time").hide();
        $("#new-tel").show();
        return false;
    }
    s.innerHTML = s.innerHTML * 1 - 1;
}
window.setInterval("run();", 1000);
/*重新发送*/
var againSend=function(obj){
    $(obj).hide();
    $("#time").text("59");
    $(obj).siblings("#new-time").show();
};