/**
 * Created by hyy on 2016/4/26 0026.
 */
function  init(){
    FastClick.attach(document.body);
}

var next=function(){
    var id = OperationURL.getQueryString("id");
    var SumTotal=$("#transfer-input").val();
    var Description=$("#remark-input").val();
    var OwnerType=$("#sel-full").attr("data-val");
    var BelongToId=$("#transfer-type").attr("data-ownerId");
    var BelongToOwnerType=$("#transfer-type").attr("data-ownerType");
    var PayPassWord=$("#transfer-money").val();
    var data = {
        OwnerId: mobile_var.userId,//当前机构ID,
        OwnerType:OwnerType,//所属机构类型,
        SumTotal: SumTotal,//转账金额,
        BelongToId: BelongToId,//对方机构ID,
        BelongToOwnerType:BelongToOwnerType,//对方所属机构类型,
        Poundage: 0,// 手续费,
        PayPassWord:PayPassWord,//支付密码,
        Description: Description//备注
    };
    getSuccessca(data, true, function (result) {
        if(result.code==0){
            if($("#transfer-input").val()=="" || $("#transfer-money").val()==""){
                $.happytoAlert("转账金额、支付密码请填写完整")
            }else{
                var TransferCode=result.data.TransferCode;
                var title = "转账成功";
                var url = "transfer_success.html?code="+TransferCode+"&OwnerType="+OwnerType;
                var new_url = OperationURL.getUrlParent(window.location.href) + url;
                OperationURL.loadURL(webviewInterface.winType.shareAndcollect,webviewInterface.mode.push,webviewInterface.orientation.portrait,title, new_url);
            }
        }else{
            if($("#transfer-use").text()=="" || $("#transfer-input").val()=="" || $("#transfer-money").val()==""){
                $.happytoAlert("用户名简称、转账金额、支付密码请填写完整")
            }
            else{
                var title = "转账失败";
                var url = "account_fail.html?";
                var new_url = OperationURL.getUrlParent(window.location.href) + url;
                OperationURL.loadURL(webviewInterface.winType.shareAndcollect,webviewInterface.mode.push,webviewInterface.orientation.portrait,title, new_url);

            }
        }
    })
};

/*列表遮罩*/
function setSecond(obj){
    $(obj).addClass("cuttrnt-color").siblings().removeClass("cuttrnt-color");
    var index=$(obj).index();
    var nameContent=$(obj).text();
    var dataType=$(obj).attr("data-val");
    $("#transfer-all .transfer-people").eq(index).show().siblings().hide();
    $("#sel-full").attr("data-val",dataType).text(nameContent);
    $("#transfer-list").hide();
}
/*点击选择收款类型*/
function change(obj){
    $("#transfer-list").show();
}
/*输入名称调接口(个人)*/
var nameUp=function(obj){
    var name=$(obj).val();
    var param={
        name:name
    };
    getTransferPeople(param,true,function (result) {
        if(result.code==0) {
            $("#transfer").html(template("tmplTra", result));
            $(obj).siblings(".transfer-error").hide();
        }else{
            $(obj).siblings(".transfer-error").show();
        }
    })
};
/*输入名称调接口(景区)*/
var spotUp=function(obj){
    var name=$(obj).val();
    var param={
        name:name
    };
    getTransferSpot(param,true,function (result) {
        if(result.code==0) {
            $("#spot").html(template("tmplSpot", result));
            $(obj).siblings(".transfer-error").hide();
        }else{
            $(obj).siblings(".transfer-error").show();
        }
    })
};
/*输入名称调接口(酒店)*/
var hotelUp=function(obj){
    var name=$(obj).val();
    var param={
        name:name
    };
    getTransferHotel(param,true,function (result) {
        if(result.code==0) {
            $("#hotel").html(template("tmplHotel", result));
            $(obj).siblings(".transfer-error").hide();
        }else{
            $(obj).siblings(".transfer-error").show();
        }
    })
};
/*输入名称调接口(旅行社)*/
var lineUp=function(obj){
    var name=$(obj).val();
    var param={
        name:name
    };
    getTransferLine(param,true,function (result) {
        if(result.code==0) {
            $("#line").html(template("tmplLine", result));
            $(obj).siblings(".transfer-error").hide();
        }else{
            $(obj).siblings(".transfer-error").show();
        }
    })
};
/*输入名称调接口(旅行社)*/
var guiUp=function(obj){
    var name=$(obj).val();
    var param={
        name:name
    };
    getTransferGui(param,true,function (result) {
        if(result.code==0) {
            $("#gui").html(template("tmplGui", result));
            $(obj).siblings(".transfer-error").hide();
        }else{
            $(obj).siblings(".transfer-error").show();
        }
    })
};

