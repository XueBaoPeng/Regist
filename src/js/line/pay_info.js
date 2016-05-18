/**
 * Created by zeke on 2016/3/30.
 * 支付模块
 */

/**
 * @totalTime：有效支付时间
 * @allAmount：诚兑通+兔呗
 * @orderAmount：订单金额
 * @payment：剩余付款金额
 * @cash：诚兑通余额
 * @rabbit：兔呗余额
 * */
var spot = {
    orderCode:"",
    totalTime : 0,
    allAmount : 0,
    orderAmount:0,
    payment : 0,
    cash:0,
    rabbit:0
};
function init(){
    FastClick.attach(document.body);
    initLocalStorage();
    loadProductAndOrder();
    loadBank();

    $("#payType").delegate("#cashPay", "click", function(){
        //TODO 现金支付
        if(spot.cash>0){
            if(spot.cash>spot.orderAmount){
                $("#rabbitPay").removeClass("choose");
            }
            $(this).toggleClass("choose");
            $("#selectBankPay li").removeClass("chooseThis");
            $("#selectPay li").removeClass("chooseThis");
            countCash();
        }
    });

    $("#payType").delegate("#rabbitPay", "click", function(){
        //TODO 兔贝支付
        if(spot.rabbit>0){
            if(spot.cash>spot.orderAmount){
                $("#cashPay").removeClass("choose");
            }
            $(this).toggleClass("choose");
            $("#selectBankPay li").removeClass("chooseThis");
            $("#selectPay li").removeClass("chooseThis");
            countCash();
        }
    });

    $("#selectBankPay").delegate("li", "click", function(){
        //TODO 银行卡快捷支付
        if(spot.payment>0){
            $(this).addClass("chooseThis").siblings().removeClass("chooseThis");
            $("#selectPay li").removeClass("chooseThis");
        }
    });

    $("#selectPay").delegate("li", "click", function(){
        //TODO 第三方支付
        if(spot.payment>0){
            $(this).addClass("chooseThis").siblings().removeClass("chooseThis");
            $("#selectBankPay li").removeClass("chooseThis");
        }
    });
}

function loadProductAndOrder(){
    var orderId = OperationURL.getQueryString("id");
    var param = {
        id : orderId
    };
    //产品订单信息
    getLineProductAndOrder(param, false, function(result){
        if(result.code == 0){
            console.log(result);
            spot.totalTime = result.data.effectiveTime;
            countTime();
            spot.orderAmount = parseFloat(result.data.orderPrice);
            $("#orderInfo").html(template("tempOrder", result));
            console.log(result);
            $("#totalMoney").html(spot.orderAmount);
            loadAccount();
        }
    });
}
function loadAccount(){
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
    //账户信息
    getAccount(param, false, function(result){
        if(result.code == 0){
            spot.cash = parseFloat(result.data.chengduitong);
            spot.rabbit = parseFloat(result.data.tubei);
            $("#payType").html(template("tmplPayType", result));
            initPayType();
        }
    });
}
function loadBank(){
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
            $("#selectBankPay").html(template("bindBank", result));
        }
    });
}

function initPayType(){
    //TODO 初始化支付方式
    if(spot.cash>0){
        $("#cashPay").addClass("choose");
    }
    if(spot.cash<spot.allAmount&&spot.rabbit>0){
        $("#rabbitPay").addClass("choose");
    }
    countCash();
}

function countCash(){
    //TODO 计算还需支付的金额
    if($("#cashPay").hasClass("choose")&&$("#rabbitPay").hasClass("choose")){
        spot.allAmount = spot.cash + spot.rabbit;
        if(spot.orderAmount>spot.allAmount){
            spot.payment = spot.orderAmount - spot.allAmount;
        }
    }else if($("#cashPay").hasClass("choose")){
        if(spot.orderAmount > spot.cash){
            spot.payment = spot.orderAmount - spot.cash;
        }else{
            spot.payment = 0;
        }
    }else if($("#rabbitPay").hasClass("choose")){
        if(spot.orderAmount > spot.rabbit){
            spot.payment = spot.orderAmount - spot.rabbit;
        }else{
            spot.payment = 0;
        }
    }else{
        spot.payment = spot.orderAmount;
    }

    //$("#selectPay").show();
    $("#totalMoney").html(spot.payment);
}


function countTime(){
    //TODO 支付倒计时
    var hour = Math.floor((spot.totalTime / 60) / 60);
    var minute = Math.floor((spot.totalTime - hour * 60 * 60) / 60);
    var second = Math.floor((spot.totalTime - hour * 60 * 60 - minute * 60));
    var timeStr = hour + ":" + minute + ":" + second;
    $("#lastTime").html(timeStr);

    spot.totalTime = spot.totalTime - 1;
    if(spot.totalTime < 0){
        return;
    }
    setTimeout(countTime, 1000);
}

function payClick(){
    //TODO 支付
    $(".pay-confirm").css("background-color","#1a87dc")
    $("#btnPay").attr("disabled","disabled");
    var id = OperationURL.getQueryString("id");
    var cashMoney=0,virtualMoney=0,payType="",payMoney=0;
    if($("#cashPay").hasClass("choose")){
        cashMoney = spot.cash>=spot.orderAmount?spot.orderAmount:spot.cash;
    }
    if($("#rabbitPay").hasClass("choose")){
        if(cashMoney==0){
            //不使用余额
            virtualMoney = spot.rabbit>=spot.orderAmount?spot.orderAmount:spot.rabbit;
        }else if(cashMoney>0){
            //使用余额
            var lastMoney = spot.orderAmount-spot.cash;
            if(lastMoney>0){
                virtualMoney = spot.rabbit >= lastMoney?lastMoney:spot.rabbit;
            }
        }
    }
    //第三方支付
    $("#selectBankPay li").each(function(){
        if($(this).hasClass("chooseThis")){
            payType=$(this).attr("data-paytype");
            payMoney = parseFloat($("#totalMoney").text());
        }
    });
    $("#selectPay li").each(function(){
        if($(this).hasClass("chooseThis")){
            payType=$(this).attr("data-paytype");
            payMoney = parseFloat($("#totalMoney").text());
        }
    });
    if(payMoney>0&&payType==""){
        $.happytoAlert("请选择支付方式");
        $("#btnPay").removeAttr("disabled","disabled");
        return;
    }
    var param={
        id:id,
        PurchaseId:mobile_var.userId,
        OrderCode:$("#hidOrderCode").val(),
        Cash:cashMoney,
        VirtualMoney:virtualMoney,
        ApiPay:payMoney,
        PayAccountType:payType,
        BankType:""
        /*userId:mobile_var.userId*/
    };
    saveLineOrderPay(param,true,function(result){
        if(result.code==0){
            if(payType=="0"&&payMoney>"0"){
                var url="order_success.html?id="+id;
                OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, "支付成功", url);
            }
        }else{
            if(payType==""){
                $.happytoAlert(result.msg);
            }
        }
        $("#btnPay").removeAttr("disabled","disabled");
    });
    if(payType=="0"){
        //快捷支付
    }else{
        //支付宝/微信支付
        if(browseInfo.isTongLianApp()&&happytoios){
            happytoios.execute('{"action":"orderPay","params":"'+JSON.stringify(param)+'"}');
        }
    }
}