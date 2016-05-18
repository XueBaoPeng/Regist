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
var hotel = {
    orderCode:"",
    totalTime : 0,
    allAmount : 0,
    orderAmount:0,
    payment : 0,
    cash:0,
    rabbit:0
};
var refound;
var order_id;
var hotelId;
function init(){
    initLocalStorage();
    loadProductAndOrder();
    loadAccount();
    loadBank();
    loadHotelId();

    $("#payType").delegate("#cashPay", "click", function(){
        //TODO 现金支付
        if(hotel.cash>0){
            if(hotel.cash>hotel.orderAmount){
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
        if(hotel.rabbit>0){
            if(hotel.cash>hotel.orderAmount){
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
        if(hotel.payment>0){
            $(this).addClass("chooseThis").siblings().removeClass("chooseThis");
            $("#selectPay li").removeClass("chooseThis");
        }
    });

    $("#selectPay").delegate("li", "click", function(){
        //TODO 第三方支付
        if(hotel.payment>0){
            $(this).addClass("chooseThis").siblings().removeClass("chooseThis");
            $("#selectBankPay li").removeClass("chooseThis");
        }
    });
}
function loadHotelId(){
	var domainName = OperationURL.getDomain();
    var param={
        domain:domainName
    };
    getHotelId(param, false, function(result){
      if(result.code == 0){
      	hotelId = result.data.Id;
      }
    });	
}
function loadProductAndOrder(){
    var orderId = OperationURL.getQueryString("id");
    var param = {
        id : orderId
    };
    //产品订单信息
   getHotelPayInto(param, true, function(result){
        if(result.code == 0){
            hotel.totalTime = result.data.effectiveTime;
            hotel.orderAmount = parseFloat(result.data.orderMoney);            
            $("#orderInfo").html(template("tempOrder", result));
            $("#totalMoney").html(hotel.allAmount);
            countTime();
            refound=result.data.roomList.roomJson;
			order_id=result.data.orderId;
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
    getAccount(param, true, function(result){
        if(result.code == 0){
            hotel.cash = parseFloat(result.data.chengduitong);
            hotel.rabbit = parseFloat(result.data.tubei);
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
    if(hotel.cash>0){
        $("#cashPay").addClass("choose");
    }
    if(hotel.cash<hotel.allAmount&&hotel.rabbit>0){
        $("#rabbitPay").addClass("choose");
    }
    countCash();
}

function countCash(){
    //TODO 计算还需支付的金额
    if($("#cashPay").hasClass("choose")&&$("#rabbitPay").hasClass("choose")){
        hotel.allAmount = hotel.cash + hotel.rabbit;
        if(hotel.orderAmount>hotel.allAmount){
            hotel.payment = hotel.orderAmount - hotel.allAmount;
        }
    }else if($("#cashPay").hasClass("choose")){
        if(hotel.orderAmount > hotel.cash){
            hotel.payment = hotel.orderAmount - hotel.cash;
        }else{
            hotel.payment = 0;
        }
    }else if($("#rabbitPay").hasClass("choose")){
        if(hotel.orderAmount > hotel.rabbit){
            hotel.payment = hotel.orderAmount - hotel.rabbit;
        }else{
            hotel.payment = 0;
        }
    }else{
        hotel.payment = hotel.orderAmount;
    }

    //$("#selectPay").show();
    $("#totalMoney").html(hotel.payment);
}


function countTime(){
    //TODO 支付倒计时
    var hour = Math.floor((hotel.totalTime / 60) / 60);
    var minute = Math.floor((hotel.totalTime - hour * 60 * 60) / 60);
    var second = Math.floor((hotel.totalTime - hour * 60 * 60 - minute * 60));
    var timeStr = hour + ":" + minute + ":" + second;
    $("#lastTime").html(timeStr);

    hotel.totalTime = hotel.totalTime - 1;
    if(hotel.totalTime < 0){
        return;
    }
    setTimeout(countTime, 1000);
}

function payClick(){
    //TODO 支付
    $("#btnPay").attr("disabled","disabled");
    var id = OperationURL.getQueryString("id");
    var cashMoney=0,virtualMoney=0,payType="",payMoney=0;
    if($("#cashPay").hasClass("choose")){
        cashMoney = hotel.cash>=hotel.orderAmount?hotel.orderAmount:hotel.cash;
    }
    if($("#rabbitPay").hasClass("choose")){
        if(cashMoney==0){
            //不使用余额
            virtualMoney = hotel.rabbit>=hotel.orderAmount?hotel.orderAmount:hotel.rabbit;
        }else if(cashMoney>0){
            //使用余额
            var lastMoney = hotel.orderAmount-hotel.cash;
            if(lastMoney>0){
                virtualMoney = hotel.rabbit >= lastMoney?lastMoney:hotel.rabbit;
            }
        }
    }
    //第三方支付
    $("#selectBankPay li").each(function(){
        if($(this).hasClass("chooseThis")){
            payType=$(this).attr("data-paytype");
            payMoney = $("#totalMoney").text();
        }
    });
    $("#selectPay li").each(function(){
        if($(this).hasClass("chooseThis")){
            payType=$(this).attr("data-paytype");
            payMoney = $("#totalMoney").text();
        }
    });
    if(payMoney>0&&payType==""){
        $.happytoAlert("请选择支付方式");
        $("#btnPay").removeAttr("disabled","disabled");
        return;
    }
    var param={
        PurchaseId:mobile_var.userId,
        OrderCode:$("#hidOrderCode").val(),
        Cash:cashMoney,
        VirtualMoney:virtualMoney,
        ApiPay:payMoney,
        PayAccountType:payType,
        BankType:"",
        userId:mobile_var.userId      
    };
    saveHotelOrderPay(param,true,function(result){
        if(result.code==0){
            if(payType==""){            
            	var url = "pay_success.html?id="+order_id+"&refound="+refound+"&hotelId="+hotelId;
			    var new_url = OperationURL.getUrlParent(window.location.href) + url;
			    OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait,  "支付成功", new_url);  
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