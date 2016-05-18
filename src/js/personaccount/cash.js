/*
* 提款
* create by zeke 2016-4-26
* */

function  init(){
	FastClick.attach(document.body);
	initLocalStorage();
    loadData();
	$("#linkBack").click(function(){
		$("#winBank").hide();
	});

	$(".pass").bind({
		focus: function(){
			$("#password input:eq(0)").focus();
		},
		blur: function(){

		}
	});
}
var loadData = function() {
	var param = {
		userId:mobile_var.userId
	};
	getAccount(param, true, function (result) {
		if(result.code==0){
			$.each(result.data.BankList, function(i, item){
				if(item.cardNo.length > 0){
					item.cardNo = item.cardNo.substr(item.cardNo.length - 4);
				}
			});
			$("#cashBank").html(template("tmplBank", result));
			$("#bankList").html(template("tmplBankChoose", result));
		}

	});
};

var loadDrawingFee = function(){
	//TODO 手续费
	var money=$("#txtMoney").val();
	if(money==""||money.length<=0){
		$("#labFee").text("0.00");
		$.happytoAlert("请输入提现金额");
		return;
	}
	var param = {
		UserId:mobile_var.userId,
		Amount:money
	};
	getCashFee(param, true, function (result) {
		if(result.code==0){
			$("#labFee").text(result.data);
		}
	});
}

function commitClick(){
	//TODO 提交提款
	var money=$("#txtMoney").val();
	if(parseFloat($("#labBalance").text())<=0){
		$.happytoAlert("没有可用提现余额");
		return;
	}
	if(money==""||money.length<=0){
		$.happytoAlert("请输入提现金额");
		return;
	}
	var str="<div class='enter-password'>"
		+	"<div class='enter-password-top'><span>请输入支付密码</span>"
		+		"<span class='ico-account-close' onclick='closePwd();'></span>"
		+	"</div>"
		+	"<div class='enter-password-center'>"
		+		"<div class='money'>&yen;"+money+"</div>"
		+		"<form id='password' disabled='disabled'>"
		+            "<input id='txtPassword' class='password' type='password' maxlength='6' value=''>"
		+            "<input class='pass' type='hidden' maxlength='1' value=''>"
		+           " <input class='pass' type='hidden' maxlength='1' value=''>"
		+            "<input class='pass' type='hidden' maxlength='1' value=''>"
		+            "<input class='pass' type='hidden' maxlength='1' value=''>"
		+            "<input class='pass' type='hidden' maxlength='1' value=''>"
		+            "<input class='pass pass_right' type='hidden' maxlength='1' value=''>"
		+    	"</form>"
		+		"<p id='labMsg' class='enter-password-error'></p>"
		+	"</div>"
		+	"<div class='enter-password-bottom'>"
		+		"<button class='' onclick='closePwd();'>取消</span>"
		+		"<button class='' onclick='confirmClick();'>确定</button>"
		+	"</div>"
		+"</div>";
	$(".enter-password").show();
	layer.open({
		type:0,
		content:str		
	})
}

function closePwd(){
	layer.closeAll();
}

function bankCheck(){
	$("#winBank").show();
}
function chooseBank(obj){
	//TODO 选择银行
	$(obj).addClass("active").siblings().removeClass("active");
	$("#bankName").text($(obj).find("span[id='labBankName']").text());
	$("#bankType").text($(obj).find("span[id='labBankType']").text());
	$("#bankNo").text($(obj).find("span[id='labBankNo']").text());
	$("#hidBankId").val($(obj).find("span[id='labBankId']").text());
	$("#winBank").hide();
}

function confirmClick(){
	//TODO 确认提交
	var money=$("#txtMoney").val();
	var pwd = $("#txtPassword").val();
	if(pwd==""){
		$("#labMsg").text("请输入支付密码");
		return;
	}
	var param={
		OwnerId:mobile_var.userId,
		OwnerType:3,
		SumTotal:money,
		PayAccountId:$("#hidBankId").val(),
		PayPassWord:pwd,
		Description:$("#txtRemark").val()
	};
	saveCash(param,false,function(result){
		if(result.code==0){
				var title = "提现成功";
				var url = "cash_success.html";
				var new_url = OperationURL.getUrlParent(window.location.href) + url;
				OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
		}else{
			$("#labMsg").text(result.msg);
		}
	});
}