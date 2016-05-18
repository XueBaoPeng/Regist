
function init(){
	var id = OperationURL.getQueryString("id");
	var data={
		id:id
	};
	getLineOrderDetail(data,true, function(result){
		if(result.code==0){
		    $("#spotMain").html(template("template", result));
			console.log(result)
	    }
	});
}
//var detailClick = function(){
//	var id = OperationURL.getQueryString("id");
//	var title = "投诉";
//	var url = "../line/line_complain.html?"+"id="+id;
//	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, title,url);
//
//};
var evaluateClick = function(){
	var id = OperationURL.getQueryString("id");
	var title = "评价";
	var url = "../line/travel_discuss.html?"+"id="+id;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push,webviewInterface.orientation.portrait, title,url);

};
var delClick = function(id){
	var orderId = OperationURL.getQueryString("id");
	var param ={
		orderId:orderId
	};
	delSpotOrder(param,false,function(result){
		if(result.code==0){
			$.happytoAlert("订单取消成功");
		}else{
			$.happytoAlert(result.msg);
		}
	});

};
var refundClick = function(){
	var orderId = OperationURL.getQueryString("id");
	var title = "申请退票";
	var new_url = OperationURL.getUrlOrigin()+"../line/order_refund.html?orderId="+orderId;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

var payClick = function(){
	var id = OperationURL.getQueryString("id");
	var title = "付款";
	var new_url = OperationURL.getUrlOrigin()+"../line/order_refund.html?id="+id;
	OperationURL.loadURL(webviewInterface.winType.normal, webviewInterface.mode.push, webviewInterface.orientation.portrait, title, new_url);
};

//var attClick = function(){
//	var orderId = OperationURL.getQueryString("id");
//	var param ={
//		orderId:orderId
//	};
//	delLineOrder(param,false,function(result){
//		if(result.code==0){
//			$.happytoAlert("参团成功");
//		}else{
//			$.happytoAlert(result.msg);
//		}
//	});
//
//};