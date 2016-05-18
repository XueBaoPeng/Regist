/**
 * Created by zeke on 2016/4/12.
 */
function init(){

    $("#btnRefundApply").click(function(){
        refundClick();
    });
    $("#reasonList").delegate("li","click",function(){
        $(this).toggleClass("ico-check")
    });

    initSpotProductRefund();
    initSpotRefundReason();
}

var initSpotProductRefund = function(){
    //TODO 产品退票信息
    var id = OperationURL.getQueryString("id");
    var orderId = OperationURL.getQueryString("orderId");
    var param = {
        id:id,
        orderId:orderId
    };
    getLineProductRefund(param,false,function(result){
        if(result.code==0){
            $("#productList").html(template("tmplProduct",result));
            console.log(result)
            calculateTotal();
        }
    });
};
var initSpotRefundReason = function(){
    //TODO 退票原因
    var param = {};
    getLineRefundReason(param,false,function(result){
        if(result.code==0){
            $("#reasonList").html(template("tmplReason",result));
        }
    });
}
var calculateTotal=function(){
    var total=0;
    $("#versionList>div").each(function(i,ele){
        var price = $(ele).find(".ver-price").text();
        var num = $(ele).find(".ver-num").val();
        total+=parseFloat(price)*parseFloat(num);
    });
    $("#totalMoney").text(total);
};
var minusClick = function(obj){
    //TODO 减少数量
    var num = parseInt($(obj).next().attr("data-num"));
    var currNum = parseInt($(obj).next().val());
    if(num>1&&currNum<=num){
        num--;
    }
    $(obj).next().val(num);
    calculateTotal();
};
var addClick = function(obj){
    //TODO 添加数量
    var num = parseInt($(obj).prev().attr("data-num"));
    var currNum = parseInt($(obj).prev().val());
    if(num>0&&currNum<num){
        num++;
    }
    $(obj).prev().val(num);
    calculateTotal();
};
var refundClick=function(){
    //TODO 提交退票申请
    var id = OperationURL.getQueryString("id");
    var num = $("#versionList>div").find(".ver-num").val();
    var reason="";
    $("#reasonList li").each(function(i,ele){
        if($(ele).hasClass("ico-check")){
            reason+=$(ele).find("span").text()+"；";
        }
    });
    var param ={
        orderId:id,
        resaon:reason,
        other:$("#txtOther").text()
    };
    saveLineOrderRefund(param,false,function(result){
        console.log(result);
        if(result.code==0){
            var title = "订单列表";
            var new_url = OperationURL.getUrlOrigin()+"refund_success.html";
            OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
        }else{
            $.happytoAlert(result.msg);
        }
    });
};