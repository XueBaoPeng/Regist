/**
 * 添加联系人
 * Created by zeke 2016-4-14
 */
function init(){
    $("#selIdType").click(function(){
        $("#conIdentify").show().fadeIn();
    });
    $("#ulType li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
    $("#finish").click(function(){
        $("#ulType li").each(function(i, ele){
            if($(ele).hasClass("active")){
                $("#selIdType span").attr("data-id", $(ele).attr("data-id"));
                $("#selIdType span").html($(ele).text());
                return false;
            }
        });
        $("#conIdentify").hide().fadeOut();
    });
}

var saveClick = function(){
    var id = OperationURL.getQueryString("id");
    var param = {
        id : id,
        contactName : $("#txtName").val(),
        identityType : $("#selIdType span").attr("data-id"),
        idCard:$("#txtIdCode").val()
    };
    if(param.contactName==""){
        $.happytoAlert("请输入姓名");
        return;
    }
    addContacts(param, false, function(result){
        if(result.code == 0){
            var title = "常用旅客信息";
            var url = "contacts_info.html?id=" + id;
            var new_url = OperationURL.getUrlParent(window.location.href) + url;
            OperationURL.loadURL(webviewInterface.winType.edit, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
        }
    });
};

	