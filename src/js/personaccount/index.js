function init(){
	var param={
        userId:183
    };
    getAccount(param, true, function(result){
      if(result.code == 0){
        $("#container").html(template("template", result));		
      }
    });
}
//承兑通账户 ，进入交易记录页
function  transactionRecord(){	
	var title = "诚兑通交易记录";	
	var url = "transaction_record.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//图贝账户，进入兔贝交易记录
function  tubeiRecord(){	
	var title = "兔贝交易记录";	
	var url = "tubei_record.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//我的优惠券，进入我的优惠券
function  myCoupon(){	
	var title = "我的优惠券";	
	var url = "my_coupon.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//我的积分，暂无
function  myIntegral(){	
//	var title = "";	
//	var url = "recharge.html";
//	var new_url = OperationURL.getUrlParent(window.location.href) + url;
//	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//充值
function  rechargeMoney(){	
	var title = "诚兑通充值";	
	var url = "recharge.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//提现
function cashMoney(){
	var title = "诚兑通提现";
	var url = "cash.html"
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//转账
function transferMoney(){
	var title = "诚兑通转账";
	var url = "transfer_account.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//购买兔贝
function buyTubei(){
	var title = "购买兔贝";
	var url = "buy_tubei.html";
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}
//我的银行卡
function myCard(){
	var title = "我的银行卡";
	var url = "my_card.html?id="+mobile_var.userId;
	var new_url = OperationURL.getUrlParent(window.location.href) + url;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
}