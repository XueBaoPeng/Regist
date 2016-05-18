/**
 * Created by hyy on 2016/4/2 0002.
 */
function  init(){
    FastClick.attach(document.body);
    $("#btnBack").click(function(){
        webviewInterface.backToAccount();
    });
}