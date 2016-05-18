/**
 * Created by zeke on 2016/4/25.
 */
function init(){
    initLocalStorage();
    loadAccount();
    $("#selectAccountPay li").click(function(){
        var money = $("#txtNum").val();
        if(money!=""&&money.length>0){
            $(this).addClass("chooseThis");
            $("#selectBankPay li").removeClass("chooseThis");
            $("#selectPay li").removeClass("chooseThis");
        }else{
            $.happytoAlert("请输入数量");
        }
    });
    $("#selectBankPay").delegate("li","click",function(){
        var money = $("#txtNum").val();
        if(money!=""&&money.length>0){
            $(this).addClass("chooseThis").siblings().removeClass("chooseThis");
            $("#selectAccountPay li").removeClass("chooseThis");
            $("#selectPay li").removeClass("chooseThis");
        }else{
            $.happytoAlert("请输入数量");
        }
    });
    $("#selectPay li").click(function(){
        var money = $("#txtNum").val();
        if(money!=""&&money.length>0){
            $(this).addClass("chooseThis").siblings().removeClass("chooseThis");
            $("#selectBankPay li").removeClass("chooseThis");
            $("#selectAccountPay li").removeClass("chooseThis");
        }else{
            $.happytoAlert("请输入数量");
        }
    });

    $("#txtNum").bind("change keyup",function(){
        $("#labPay").text($(this).val());
    });

    $("#btnPay").click(function(){
        payClick();
    });
}

function loadAccount(){
    //TODO 账户信息
    var platform = 6;
    if(browseInfo.isIosApp()){
        platform = 7;
    }
    else if(browseInfo.isAndroidApp()){
        platform = 8;
    }
    var param = {
        userId : mobile_var.userId,
        clientType:platform
    };
    getAccount(param, false, function(result){
        if(result.code == 0){
            $("#labBalance").text(parseFloat(result.data.tubei));
            $("#labAccBalance").text(parseFloat(result.data.chengduitong));
            if(result.data.chengduitong<=0){
                $("#selectAccountPay").hide();
            }
            //处理银行卡
            $.each(result.data.BankList, function(i, item){
                if(item.cardNo.length > 0){
                    item.cardNo = item.cardNo.substr(item.cardNo.length - 4);
                }
            });
            if(result.data.BankList.length<=0){
                $("#selectBankPay").hide();
            }
            $("#selectBankPay").html(template("tmplBank",result));
        }else{
            $.happytoAlert(result.msg);
        }
    });
}

function payClick(){
    //TODO 提交购买兔呗
    var payType="",money = parseFloat($("#txtNum").val());
    $("#selectAccountPay li").each(function(){
        if($(this).hasClass("chooseThis")){
            payType=$(this).attr("data-paytype");
        }
    });
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
        $.happytoAlert("请选择支付方式");
        return;
    }
    var param = {
        OwnerId : mobile_var.userId,
        OwnerType:3,
        SumTotal:money,
        PayAccountType:payType,
        RechargeType:2,
        PayType:payType
    };
    $("#btnPay").attr("disabled","disabled");
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
        $("#btnPay").removeAttr("disabled","disabled");
    });
}