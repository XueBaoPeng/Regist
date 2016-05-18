/**
 * 诚兑通充值
 * Created by zeke on 2016/4/16.
 */
function init(){
    FastClick.attach(document.body);
    //获取用户ID
    initLocalStorage();
    loadBank();

    $("#btnNext").click(function(){
        saveHappyRecharge();
    });

    $("#selectBankPay").delegate("li", "click", function(){
        //TODO 银行卡快捷支付
        var money =$("#txtMoney").val();
        if(money.length>0&& parseFloat(money)>0){
            $(this).addClass("chooseThis").siblings().removeClass("chooseThis");
            $("#selectPay li").removeClass("chooseThis");
        }else{
            $.happytoAlert("请输入金额");
        }
    });

    $("#selectPay").delegate("li", "click", function(){
        //TODO 第三方支付
        var money =$("#txtMoney").val();
        if(money.length>0&& parseFloat(money)>0){
            $(this).addClass("chooseThis").siblings().removeClass("chooseThis");
            $("#selectBankPay li").removeClass("chooseThis");
        }else{
            $.happytoAlert("请输入金额");
        }
    });
}

function loadBank(){
    //TODO 获取绑定的银行
    var param = {
        id : mobile_var.userId
    };
    //银行信息
    getBanksList(param, true, function(result){
        if(result.code == 0){
            $.each(result.data, function(i, item){
                if(item.cardNo.length > 0){
                    item.cardNo = item.cardNo.substr(item.cardNo.length - 4);
                }
            });
            $("#selectBankPay").html(template("tmplBank", result));
        }
    });
}

var saveHappyRecharge = function(){
    //TODO 提交充值
    var payType="",money = parseFloat($("#txtMoney").val());
    $("#selectBankPay li").each(function(){
        if($(this).hasClass("chooseThis")){
            payType=$(this).attr("data-paytype");
        }
    });
    $("#selectPay li").each(function(){
        if($(this).hasClass("chooseThis")){
            payType=$(this).attr("data-paytype");
        }
    });
    if(payType==""){
        $.happytoAlert("请选择充值方式");
        return;
    }
    var param = {
        OwnerId : mobile_var.userId,
        OwnerType:3,
        SumTotal:money,
        PayAccountType:payType,
        RechargeType:1,
        PayType:payType
    };
    $("#btnNext").attr("disabled","disabled");
    saveRecharge(param, false, function(result){
        if(result.code == 0){
            param.RechargeCode = result.data.RechargeCode;
            param.price = result.data.price;
            if(payType=="0"){
                //快捷支付
            }else{
                //第三方支付
                if(browseInfo.isTongLianApp()&&happytoios){
                    happytoios.execute('{"action":"rechargePay","params":"'+JSON.stringify(param)+'"}');
                }
            }
        }else{
            $.happytoAlert(result.msg);
        }
        $("#btnNext").removeAttr("disabled","disabled");
    });
};